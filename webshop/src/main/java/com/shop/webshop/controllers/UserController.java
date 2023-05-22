package com.shop.webshop.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Role;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.CartItemRepository;
import com.shop.webshop.repositories.RoleRepository;
import com.shop.webshop.repositories.UserRepository;
import com.shop.webshop.service.CartService;
import com.shop.webshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemRepository cartItemRepository;

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
        requestedUser.setPassword(null);
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
            if(passwordEncoder.matches(newuser.getPassword(), user.getPassword()))
            {
                if(newuser.getNewPassword() == null)
                user.setPassword(newuser.getPassword());
                else user.setPassword(newuser.getNewPassword());
            }
            else {
                throw new AccessDeniedException("Password not match");
            }
            user.setAddress(newuser.getAddress());
            user.setCountry(newuser.getCountry());
            user.setPostcode(newuser.getPostcode());
            user.setRegion(newuser.getRegion());
            return userService.saveUser(user);
                })
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        return requestedUser;
    }
    @PutMapping("addCartItem/{username}")
    public void addCartItem(@RequestBody CartItem Item, @PathVariable ("username") String requestedUsername, Principal principal){
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))){
            throw new AccessDeniedException("cannot access");
        }
        User requestedUser = userRepository.findByUsername(requestedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        cartService.addCartItem(requestedUser.getCart(), Item);
    }

    @PutMapping("removeCartItem/{username}")
    public void removeCartItem(@RequestBody CartItem Item, @PathVariable ("username") String requestedUsername, Principal principal){
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))){
            throw new AccessDeniedException("cannot access");
        }
        User requestedUser = userRepository.findByUsername(requestedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        cartService.removeCartItem(requestedUser.getCart(), Item);
    }

}
