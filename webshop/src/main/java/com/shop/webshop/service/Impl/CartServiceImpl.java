package com.shop.webshop.service.Impl;

import com.shop.webshop.models.Cart;
import com.shop.webshop.models.CartItem;
import com.shop.webshop.repositories.CartItemRepository;
import com.shop.webshop.repositories.CartRepository;
import com.shop.webshop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;


@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    CartRepository cartRepository;

    @Override
    public void addCartItem(Cart cart, CartItem cartItem) {
        if(cartItem.getQuantity() < 1 || cartItem.getProduct().getQuantity() < cartItem.getQuantity()){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Cannot add this quantity to cart");
        }
        cart = cartRepository.getById(cart.getId());
        cart.setCartTotal(cart.getCartTotal() + cartItem.getQuantity() * cartItem.getProduct().getPrice());
        cartItem.setCart(cart);
        cartRepository.save(cart);
        for(CartItem item : cart.getCartItems()){
            if(item.getProduct().getId() == cartItem.getProduct().getId()){
                if(cartItem.getProduct().getQuantity() >= item.getQuantity() + cartItem.getQuantity()){
                    item.setQuantity(item.getQuantity() + cartItem.getQuantity());
                    cartItemRepository.save(item);
                    return;
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Cannot add this quantity to cart");
                }

            }
        }
        cartItemRepository.save(cartItem);
    }

    @Override
    public void removeCartItem(Cart cart, CartItem cartItem) {
        cart = cartRepository.getById(cart.getId());
        cart.setCartTotal(cart.getCartTotal() - cartItem.getQuantity() * cartItem.getProduct().getPrice());

        CartItem requested = cartItemRepository.getById(cartItem.getId());
        if(requested.getQuantity()-cartItem.getQuantity() > 0) {
            requested.setQuantity(requested.getQuantity() - cartItem.getQuantity());
            cartItemRepository.save(requested);
        }else {
            cart.getCartItems().remove(requested);
            cartItemRepository.delete(requested);
        }
        cartRepository.save(cart);
    }
}
