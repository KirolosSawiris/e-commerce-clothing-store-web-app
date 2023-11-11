package com.shop.webshop.service.Impl;

import com.shop.webshop.models.Category;
import com.shop.webshop.models.Product;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.ProductRepository;
import com.shop.webshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Override
    public void addFavorite(Product product, User user) {
        Product FProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new EntityNotFoundException("product Not Found with this id: " + product.getId()));
        List<User> favorits = FProduct.getFavorits();
        favorits.add(user);
        FProduct.setFavorits(favorits);
        productRepository.save(FProduct);
    }

    @Override
    public void removeFavorite(Product product, User user) {
        Product FProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new EntityNotFoundException("product Not Found with this id: " + product.getId()));
        List<User> favorits = FProduct.getFavorits();
        favorits.remove(user);
        FProduct.setFavorits(favorits);
        productRepository.save(FProduct);
    }

}
