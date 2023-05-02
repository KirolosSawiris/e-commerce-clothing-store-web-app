package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Order;
import com.shop.webshop.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> list()
    {
        return orderRepository.findAll();
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
