package com.shop.webshop.service;


import com.shop.webshop.models.Category;
import com.shop.webshop.models.Product;
import com.shop.webshop.models.User;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    public void addFavorite(Product product, User user);
    public void removeFavorite(Product product, User user);

}
