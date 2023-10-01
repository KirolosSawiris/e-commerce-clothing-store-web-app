package com.shop.webshop.security.services;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.shop.webshop.models.PaymentDetails;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentService {

    private static final String Order_Placed = "Placed";
    private static final String Key = "rzp_test_49qbWP5JOTtLzy";
    private static final String  Key_Secret = "XwXgo1jNEcLCpl8aZPKxMEAN";
    private static final String Currency = "USD";

    public PaymentDetails CreatePayment (double amount) {

        try {

            RazorpayClient razorpayClient = new RazorpayClient(Key, Key_Secret);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("amount", amount * 100);
            jsonObject.put("currency", Currency);
            Order order = razorpayClient.orders.create(jsonObject);
            PaymentDetails paymentDetails = GetPaymentDetails(order);
            return paymentDetails;
        }catch (Exception e){

        }
        return null;
    }

    public PaymentDetails GetPaymentDetails(Order order){
        int amount = order.get("amount");
        PaymentDetails paymentDetails = new PaymentDetails(order.get("id"), order.get("currency"), amount);
        return paymentDetails;
    }

}
