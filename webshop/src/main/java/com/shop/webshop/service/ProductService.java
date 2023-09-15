package com.shop.webshop.service;


import com.shop.webshop.models.Product;
import com.shop.webshop.models.User;

public interface ProductService {

    public void addFavorite(Product product, User user);
    public void removeFavorite(Product product, User user);
}
