package com.shop.webshop.controllers;

import com.razorpay.RazorpayException;
import com.shop.webshop.models.Cart;
import com.shop.webshop.models.PaymentDetails;
import com.shop.webshop.security.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;



@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    @PostMapping("/create-payment")
    public PaymentDetails createPayment(@RequestBody Cart cart) {

        return paymentService.CreatePayment(cart.getCartTotal());

    }



}

