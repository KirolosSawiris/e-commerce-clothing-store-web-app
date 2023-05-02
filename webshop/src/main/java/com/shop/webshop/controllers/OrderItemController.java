package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.OrderItem;
import com.shop.webshop.repositories.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orderItems")
public class OrderItemController {
    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping
    public List<OrderItem> list()
    {
        return orderItemRepository.findAll();
    }

    @PostMapping
    public OrderItem create(@RequestBody final OrderItem orderItem){
        return orderItemRepository.saveAndFlush(orderItem);
    }
    @GetMapping("/{id}")
    public OrderItem get(@PathVariable ("id") long id){
        return orderItemRepository.getOne(id);
    }
}
