package com.shop.webshop.repositories;

import com.shop.webshop.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>  findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query(value = "update Users set email = :email, first_name = :first_name, last_name = :last_name, address = :address, country = :country, postcode = :postcode, region = :region where username = :username", nativeQuery = true)
    void SaveWithoutPassword(@Param("email") String email, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("address") String address,
                             @Param("country") String country, @Param("postcode") String postcode, @Param("region") String region, @Param("username") String username);

    @Transactional
    @Modifying
    @Query(value = "insert into favorite_products (user_id, product_id) values (:user_id, :product_id)", nativeQuery = true)
    void addFavorite(@Param("user_id") Long user_id, @Param("product_id") Long product_id);

    @Transactional
    @Modifying
    @Query(value = "delete from favorite_products where user_id = :user_id and product_id = :product_id", nativeQuery = true)
    void removeFavorite(@Param("user_id") Long user_id, @Param("product_id") Long product_id);
}
