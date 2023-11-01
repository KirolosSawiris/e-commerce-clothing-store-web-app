package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Order;
import com.shop.webshop.models.OrderTicket;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.math.BigDecimal;
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
    public List<Order> list()
    {
//        List<OrderTicket> orderTickets = new ArrayList<>();
        //List<Order> orders = orderRepository.findOrderByStatus("paid");
//        for(Order o : orders){
//            OrderTicket orderTicket = new OrderTicket(o,o.getUser().getId(),
//                    o.getUser().getUsername(), o.getUser().getFirstName(),
//                    o.getUser().getLastName(), o.getUser().getEmail(),
//                    o.getUser().getAddress(), o.getUser().getCountry(),
//                    o.getUser().getRegion(), o.getUser().getPostcode());
//            orderTickets.add(orderTicket);
//        }
        List<Order> orders = orderRepository.findAll(Sort.by("id"));
        return orders;
    }

    @PostMapping
    public Order create(@RequestBody final Order order){
        return orderRepository.saveAndFlush(order);
    }

    @PutMapping("/update")
    public Order update(@RequestBody final Order order){
        Order order1 = orderRepository.getOne(order.getId());
        order1.setStatus(order.getStatus());
        return orderRepository.saveAndFlush(order1);
    }
    @GetMapping("/{id}")
    public Order get(@PathVariable ("id") long id){
        return orderRepository.getOne(id);
    }

    @GetMapping("/filter")
    public List<Order> filter(@RequestParam(required = false) Double minPayment,
                        @RequestParam(required = false) Double maxPayment,
                        @RequestParam(required = false) String customerEmail,
                        @RequestParam(required = false) String status){
        List<Order> orders = orderRepository.findAll(Sort.by("id"));
        List<Order> result = new ArrayList<>();
        for(Order order: orders){
            if(minPayment != null){
                if(order.getAmount()< minPayment){
                    continue;
                }

            }
            if(maxPayment != null){
                if(order.getAmount()>maxPayment){
                    continue;
                }
            }
            if(customerEmail != null){
                if(!order.getCustomerEmail().equals(customerEmail)){
                    continue;
                }
            }
            if(status != null){
                if(!order.getStatus().equals(status)){
                    continue;
                }
            }
            result.add(order);
        }
        return result;
    }
}
