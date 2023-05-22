package com.shop.webshop.service.Impl;

import com.shop.webshop.models.Cart;
import com.shop.webshop.models.CartItem;
import com.shop.webshop.repositories.CartItemRepository;
import com.shop.webshop.repositories.CartRepository;
import com.shop.webshop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    CartRepository cartRepository;

    @Override
    public void addCartItem(Cart cart, CartItem cartItem) {
        cart.setCartTotal(cart.getCartTotal() + cartItem.getQuantity() * cartItem.getProduct().getPrice().intValue());
        cartItem.setCart(cart);
        cartRepository.save(cart);
        cartItemRepository.save(cartItem);
    }

    @Override
    public void removeCartItem(Cart cart, CartItem cartItem) {
        cart.setCartTotal(cart.getCartTotal() - cartItem.getQuantity() * cartItem.getProduct().getPrice().intValue());
        cartRepository.save(cart);
        cartItemRepository.deleteById(cartItem.getId());

    }
}
