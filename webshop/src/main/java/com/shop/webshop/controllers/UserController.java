package com.shop.webshop.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Role;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.RoleRepository;
import com.shop.webshop.repositories.UserRepository;
import com.shop.webshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public List<User> list()
    {
        return userRepository.findAll();
    }

    @PostMapping("/Register")
    public User create(@RequestBody final User user){
        return userService.saveUser(user);
    }
    @GetMapping("/{username}")
    public User get(@PathVariable ("username") String requestedUsername, Principal principal){
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))){
            throw new AccessDeniedException("cannot access");
        }
        User requestedUser = userRepository.findByUsername(requestedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        return requestedUser;
    }

    @PutMapping("/{username}")
    public User editUser(@RequestBody User newuser, @PathVariable ("username") String requestedUsername, Principal principal){
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))){
            throw new AccessDeniedException("cannot access");
        }
        User requestedUser = userRepository.findByUsername(requestedUsername).map(user -> {
            user.setEmail(newuser.getEmail());
            user.setUsername(newuser.getUsername());
            user.setFirstName(newuser.getFirstName());
            user.setLastName(newuser.getLastName());
            user.setPassword(newuser.getPassword());
            user.setAddress(newuser.getAddress());
            user.setCountry(newuser.getCountry());
            user.setPostcode(newuser.getPostcode());
            user.setRegion(newuser.getRegion());
            return userService.saveUser(user);
                })
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        return requestedUser;
    }

}
