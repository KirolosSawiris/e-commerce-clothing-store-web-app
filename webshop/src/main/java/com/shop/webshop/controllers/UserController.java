package com.shop.webshop.controllers;

import com.shop.webshop.models.User;
import com.shop.webshop.repositories.UserRepository;
import com.shop.webshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> list()
    {
        return userRepository.findAll();
    }

    @PostMapping
    public User create(@RequestBody final User user){
        return userService.saveUser(user);
    }
}
