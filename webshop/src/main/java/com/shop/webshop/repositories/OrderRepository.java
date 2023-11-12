package com.shop.webshop.repositories;

import com.shop.webshop.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findOrderByRazorpayOrderId(String razorpayId);
    List<Order> findOrderByStatus(String status);
}
