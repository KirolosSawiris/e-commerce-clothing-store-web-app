package com.shop.webshop.controllers;

import com.shop.webshop.models.Customer;
import com.shop.webshop.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> list()
    {
        return customerRepository.findAll();
    }

    @PostMapping
    public Customer create(@RequestBody final Customer customer){
        return customerRepository.saveAndFlush(customer);
    }
}
