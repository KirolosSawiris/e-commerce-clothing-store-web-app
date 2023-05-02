package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Role;
import com.shop.webshop.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public List<Role> list()
    {
        return roleRepository.findAll();
    }

    @PostMapping
    public Role create(@RequestBody final Role role){
        return roleRepository.saveAndFlush(role);
    }
    @GetMapping("/{id}")
    public Role get(@PathVariable ("id") long id){
        return roleRepository.getOne(id);
    }
}
