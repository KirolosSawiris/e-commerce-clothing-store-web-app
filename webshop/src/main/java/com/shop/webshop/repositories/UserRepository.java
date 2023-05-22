package com.shop.webshop.repositories;

import com.shop.webshop.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>  findByUsername(String username);

    @Transactional
    @Query(value = "insert into city (email, first_name, last_name, username, address, country, postcode, region) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", nativeQuery = true)
    User SaveWithoutPassword(User user);

}
