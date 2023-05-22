package com.shop.webshop.service;

import com.shop.webshop.models.Cart;
import com.shop.webshop.models.CartItem;

public interface CartService {
    public void addCartItem(Cart cart, CartItem cartItem);
    public void removeCartItem(Cart cart, CartItem cartItem);
}
