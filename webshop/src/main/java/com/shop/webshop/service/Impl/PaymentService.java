package com.shop.webshop.service.Impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.shop.webshop.models.*;
import com.shop.webshop.repositories.CartItemRepository;
import com.shop.webshop.repositories.OrderItemRepository;
import com.shop.webshop.repositories.OrderRepository;
import com.shop.webshop.service.Impl.CartServiceImpl;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

@Service
@Transactional
public class PaymentService {

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderRepository orderRepository;

    private static final String Order_Placed = "Placed";
    private static final String Key = "rzp_test_49qbWP5JOTtLzy";
    private static final String  Key_Secret = "XwXgo1jNEcLCpl8aZPKxMEAN";
    private static final String Currency = "USD";

    public com.shop.webshop.models.Order CreateOrder (User user, com.shop.webshop.models.Order recivedOrder) {

        try {
            RazorpayClient razorpayClient = new RazorpayClient(Key, Key_Secret);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("amount", (recivedOrder.getAmount())*100);
            jsonObject.put("currency", Currency);
            Order order = razorpayClient.orders.create(jsonObject);
            com.shop.webshop.models.Order newOrder = ConvertCartToOrder(order,recivedOrder, user.getCart());
            return newOrder;
        }catch (Exception e){
            System.out.println(e);
            System.out.println(e);
        }
        return null;
    }

    public com.shop.webshop.models.Order ConvertCartToOrder(Order order, com.shop.webshop.models.Order recivedOrder, Cart cart){
        com.shop.webshop.models.Order newOrder = recivedOrder;
        try{
            for(CartItem cartItem : cart.getCartItems()){
                if(cartItem.getProduct().getQuantity() >= cartItem.getQuantity()){
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProduct(cartItem.getProduct());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setOrder(newOrder);
                    orderItemRepository.save(orderItem);
                }else{
                    throw new RuntimeException("The requested cartItem quantity exceeded the amount available");
                }
            }
        }catch (Exception exception){

        }
        newOrder.setRazorpayOrderId(order.get("id"));
        newOrder.setStatus(order.get("status"));
        newOrder.setCreatedAt(order.get("created_at"));
        orderRepository.save(newOrder);
        return newOrder;
    }

    public com.shop.webshop.models.Order confirmPayment(PaymentResponse paymentResponse){
        com.shop.webshop.models.Order order = orderRepository.findOrderByRazorpayOrderId(paymentResponse.getRazorpay_order_id());
        boolean status = false;
        try {
            RazorpayClient razorpayClient = new RazorpayClient(Key, Key_Secret);
            String secret = Key_Secret;
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", paymentResponse.getRazorpay_order_id());
            options.put("razorpay_payment_id", paymentResponse.getRazorpay_payment_id());
            options.put("razorpay_signature", paymentResponse.getRazorpay_signature());
            status = Utils.verifyPaymentSignature(options, secret);
        }catch (Exception exception){

        }
        if(status)
        {
            order.setStatus("paid");
            order.setRazorpayTransactionId(paymentResponse.getRazorpay_payment_id());
            order.setRazorpaySignature(paymentResponse.getRazorpay_signature());
            for(OrderItem item : order.getOrderItems()){
                item.getProduct().setQuantity(item.getProduct().getQuantity()-item.getQuantity());
            }
        }else{
            orderRepository.delete(order);
        }
        return order;
    }

}
