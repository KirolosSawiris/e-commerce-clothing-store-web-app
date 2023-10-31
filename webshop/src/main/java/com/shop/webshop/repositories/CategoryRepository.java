package com.shop.webshop.repositories;

import com.shop.webshop.models.Category;
import org.apache.catalina.LifecycleState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoryByGender(String gender);
}
