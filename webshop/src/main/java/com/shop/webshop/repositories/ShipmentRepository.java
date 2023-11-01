package com.shop.webshop.repositories;

import com.shop.webshop.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentRepository extends JpaRepository<Role, Long> {
}
