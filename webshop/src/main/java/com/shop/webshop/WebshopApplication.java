package com.shop.webshop;

import com.shop.webshop.models.Role;
import com.shop.webshop.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.sql.DataSource;
import java.util.List;

@SpringBootApplication
public class WebshopApplication {


	public static void main(String[] args) {
		SpringApplication.run(WebshopApplication.class, args);
	}

//	@Bean
//	PasswordEncoder passwordEncoder(){
//		return new BCryptPasswordEncoder();
//	}


}
