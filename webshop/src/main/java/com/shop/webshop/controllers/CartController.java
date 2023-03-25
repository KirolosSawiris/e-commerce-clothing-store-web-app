package com.shop.webshop.controllers;

import com.shop.webshop.models.Cart;
import com.shop.webshop.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carts")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @GetMapping
    public List<Cart> list()
    {
        return cartRepository.findAll();
    }

    @PostMapping
    public Cart create(@RequestBody final Cart cart){
        return cartRepository.saveAndFlush(cart);
    }
}
