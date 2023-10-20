package com.shop.webshop.controllers;

import com.shop.webshop.models.Cart;
import com.shop.webshop.models.Order;
import com.shop.webshop.models.PaymentResponse;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.OrderRepository;
import com.shop.webshop.repositories.UserRepository;
import com.shop.webshop.service.Impl.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/create-payment/{username}")
    public Order createPayment(@PathVariable ("username") String requestedUsername, @RequestBody Cart cart, Principal principal) {
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername)){
            throw new AccessDeniedException("cannot access");
        }
        Order order = paymentService.CreateOrder(cart);
        order.setUser(currentUser);
        orderRepository.save(order);
        return order;

    }

    @PostMapping("/confirm-payment")
    public Order confirmPayment(@RequestBody PaymentResponse paymentResponse) {
        return paymentService.confirmPayment(paymentResponse);
    }



}

