package com.shop.webshop.controllers;

import com.shop.webshop.models.Product;
import com.shop.webshop.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> list()
    {
        return productRepository.findAll();
    }

    @PostMapping
    public Product create(@RequestBody final Product product){
        return productRepository.saveAndFlush(product);
    }
}
