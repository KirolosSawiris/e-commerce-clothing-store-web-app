package com.shop.webshop.service.Impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.shop.webshop.models.Cart;
import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.OrderItem;
import com.shop.webshop.models.PaymentResponse;
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

    public com.shop.webshop.models.Order CreateOrder (Cart cart) {

        try {

            RazorpayClient razorpayClient = new RazorpayClient(Key, Key_Secret);
            JSONObject jsonObject = new JSONObject();
            int Shipping = 0;
            if((int)(cart.getCartTotal()) * 100 > 0){
                 Shipping = 20;
            }
            jsonObject.put("amount", (int)(cart.getCartTotal()+Shipping) * 100);
            jsonObject.put("currency", Currency);
            Order order = razorpayClient.orders.create(jsonObject);
            com.shop.webshop.models.Order newOrder = ConvertCartToOrder(order, cart);
            return newOrder;
        }catch (Exception e){
            System.out.println(e);
            System.out.println(e);
        }
        return null;
    }

    public com.shop.webshop.models.Order ConvertCartToOrder(Order order, Cart cart){
        com.shop.webshop.models.Order newOrder = new com.shop.webshop.models.Order();
        try{
            for(CartItem cartItem : cart.getCartItems()){
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(cartItem.getProduct());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setOrder(newOrder);
                orderItemRepository.save(orderItem);
            }
        }catch (Exception exception){

        }
        newOrder.setAmount(order.get("amount"));
        newOrder.setRazorpayOrderId(order.get("id"));
        newOrder.setStatus(order.get("status"));
        newOrder.setCreatedAt(order.get("created_at"));
        Calendar c = Calendar.getInstance();
        c.setTime(newOrder.getCreatedAt());
        c.add(Calendar.DAY_OF_MONTH, 3);
        newOrder.setExpectedAt(c.getTime());
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
        }else{
            orderRepository.delete(order);
        }
        return order;
    }

}
