package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Category;
import com.shop.webshop.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> list()
    {
        return categoryRepository.findAll();
    }

    @GetMapping("/{gender}")
    public List<Category> getByGender(@PathVariable ("gender") String gender){
        return categoryRepository.findCategoryByGender(gender);
    }

    @PostMapping
    public Category create(@RequestBody final Category category){
        return categoryRepository.saveAndFlush(category);
    }
//    @GetMapping("/{id}")
//    public Category get(@PathVariable ("id") long id){
//        return categoryRepository.getOne(id);
//    }
}
