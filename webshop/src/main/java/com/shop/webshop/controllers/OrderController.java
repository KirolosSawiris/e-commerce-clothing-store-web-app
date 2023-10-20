package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Order;
import com.shop.webshop.models.OrderTicket;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<OrderTicket> list()
    {
        List<OrderTicket> orderTickets = new ArrayList<>();
        List<Order> orders = orderRepository.findOrderByStatus("paid");
        for(Order o : orders){
            OrderTicket orderTicket = new OrderTicket(o,o.getUser().getId(),
                    o.getUser().getUsername(), o.getUser().getFirstName(),
                    o.getUser().getLastName(), o.getUser().getEmail(),
                    o.getUser().getAddress(), o.getUser().getCountry(),
                    o.getUser().getRegion(), o.getUser().getPostcode());
            orderTickets.add(orderTicket);
        }
        return orderTickets;
    }

    @PostMapping
    public Order create(@RequestBody final Order order){
        return orderRepository.saveAndFlush(order);
    }
    @GetMapping("/{id}")
    public Order get(@PathVariable ("id") long id){
        return orderRepository.getOne(id);
    }
}
