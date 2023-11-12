package com.shop.webshop.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Product;
import com.shop.webshop.models.Role;
import com.shop.webshop.models.User;
import com.shop.webshop.repositories.*;
import com.shop.webshop.service.CartService;
import com.shop.webshop.service.Impl.MailServiceImpl;
import com.shop.webshop.service.ProductService;
import com.shop.webshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
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
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MailServiceImpl mailService;

    @GetMapping
    public List<User> list()
    {
        return userRepository.findAll();
    }

    @PostMapping("/Register")
    public User create(@RequestBody final User user){
        user.setUsername(user.getUsername().toLowerCase());
        user.setEmail(user.getEmail().toLowerCase());
        return userService.saveUser(user);
    }

    @GetMapping("/sendNewPassword/{email}")
        public void sendNewPasswordToEmail(@PathVariable ("email") String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));
        mailService.sendNewPassword(user);
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

    @PutMapping("changePassword/{username}")
    public User editUserPassword(@RequestBody User newuser, @PathVariable ("username") String requestedUsername, Principal principal){
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))){
            throw new AccessDeniedException("cannot access");
        }
        User requestedUser = userRepository.findByUsername(requestedUsername).map(user -> {
            if(passwordEncoder.matches(newuser.getPassword(), user.getPassword()))
            {
                if(newuser.getNewPassword() == null)
                user.setPassword(newuser.getPassword());
                else user.setPassword(newuser.getNewPassword());
            }
            else {
                throw new AccessDeniedException("Password not match");
            }
            return userService.saveUser(user);
                })
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        return requestedUser;
    }

    @PutMapping("/{username}")
    public void editUser(@RequestBody User newuser, @PathVariable ("username") String requestedUsername, Principal principal){
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))){
            throw new AccessDeniedException("cannot access");
        }
        userRepository.SaveWithoutPassword(newuser.getEmail(), newuser.getFirstName(), newuser.getLastName(), newuser.getAddress(), newuser.getCountry(), newuser.getPostcode(), newuser.getRegion(), requestedUsername);
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

    @PutMapping("addFavourite/{username}")
    public void addFavourite(@RequestBody Product product, @PathVariable ("username") String requestedUsername, Principal principal){
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if(!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))){
            throw new AccessDeniedException("cannot access");
        }
        User requestedUser = userRepository.findByUsername(requestedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        userRepository.addFavorite(requestedUser.getId(), product.getId());
    }

    @PutMapping("removeFavourite/{username}")
    public void removeFavourite(@RequestBody Product product, @PathVariable ("username") String requestedUsername, Principal principal) {
        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + currentUsername));
        if (!currentUsername.equals(requestedUsername) && !currentUser.getRoles().contains(roleRepository.findRoleByName("Role_Admin"))) {
            throw new AccessDeniedException("cannot access");
        }
        User requestedUser = userRepository.findByUsername(requestedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + requestedUsername));
        userRepository.removeFavorite(requestedUser.getId(), product.getId());
    }

}
