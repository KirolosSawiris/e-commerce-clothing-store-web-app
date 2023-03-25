package com.shop.webshop.controllers;

import com.shop.webshop.models.Cart;
import com.shop.webshop.models.CartItem;
import com.shop.webshop.repositories.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cartItems")
public class CartItemController {
    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping
    public List<CartItem> list()
    {
        return cartItemRepository.findAll();
    }

    @PostMapping
    public CartItem create(@RequestBody final CartItem cartItem){
        return cartItemRepository.saveAndFlush(cartItem);
    }
}
