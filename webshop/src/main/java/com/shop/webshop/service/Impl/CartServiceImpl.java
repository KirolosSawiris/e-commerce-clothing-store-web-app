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
        if(cartItem.getQuantity() < 1){
            return;
        }
        cart = cartRepository.getById(cart.getId());
        cart.setCartTotal(cart.getCartTotal() + cartItem.getQuantity() * cartItem.getProduct().getPrice().doubleValue());
        cartItem.setCart(cart);
        cartRepository.save(cart);
        for(CartItem item : cart.getCartItems()){
            if(item.getProduct().getId() == cartItem.getProduct().getId()){
                item.setQuantity(item.getQuantity() + cartItem.getQuantity());
                cartItemRepository.save(item);
                return;
            }
        }
        cartItemRepository.save(cartItem);
    }

    @Override
    public void removeCartItem(Cart cart, CartItem cartItem) {
        cart = cartRepository.getById(cart.getId());
        cart.setCartTotal(cart.getCartTotal() - cartItem.getQuantity() * cartItem.getProduct().getPrice().doubleValue());
        cartRepository.save(cart);
        CartItem requested = cartItemRepository.getById(cartItem.getId());
        if(requested.getQuantity()-cartItem.getQuantity() > 0) {
            requested.setQuantity(requested.getQuantity() - cartItem.getQuantity());
            cartItemRepository.save(requested);
        }else {
            cartItemRepository.delete(requested);
        }
    }
}
