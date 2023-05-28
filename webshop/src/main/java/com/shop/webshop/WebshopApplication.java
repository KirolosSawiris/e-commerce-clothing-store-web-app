package com.shop.webshop;

import com.shop.webshop.models.Role;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.RoleRepository;
import com.shop.webshop.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.sql.DataSource;
import java.util.ArrayList;
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

//	@Bean
//	CommandLineRunner run(UserService userService, RoleRepository roleRepository) {
//		return args -> {
//			Role role1 = new Role("Role_Admin");
//			roleRepository.saveAndFlush(role1);
//			User user1= new User();
//			user1.setUsername("kirosawiris");
//			user1.setPassword("1234");
//			user1.setEmail("kirosawiris@gmail.com");
//			user1.setFirstName("kirolos");
//			user1.setLastName("sawiris");
//			user1.setAddress("street");
//			user1.setPostcode("1114");
//			user1.setCountry("Hungary");
//			user1.setRegion("Budapest");
//			List<Role> roles = new ArrayList<>();
//			roles.add(role1);
//			user1.setRoles(roles);
//			userService.saveUser(user1);
//
//			Role role2 = new Role("Role_Dev");
//			roleRepository.saveAndFlush(role2);
//			User user2= new User();
//			user2.setUsername("kikosawiris");
//			user2.setPassword("1234");
//			user2.setEmail("kikosawiris@gmail.com");
//			user2.setFirstName("kiko");
//			user2.setLastName("Sawiris");
//			user2.setAddress("street");
//			user2.setPostcode("1114");
//			user2.setCountry("Hungary");
//			user2.setRegion("Budapest");
//			List<Role> roles2 = new ArrayList<>();
//			roles2.add(role2);
//			user2.setRoles(roles2);
//			userService.saveUser(user2);
//
//		};
//
//	}


}
