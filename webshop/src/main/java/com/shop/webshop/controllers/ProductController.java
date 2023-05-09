package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Product;
import com.shop.webshop.repositories.ProductRepository;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;



    @GetMapping
    public List<Product> list()
    {
        return productRepository.findAll();
    }

    @PostMapping
    public Product create(@RequestBody final Product product){
        return productRepository.saveAndFlush(product);
    }

//    @PatchMapping(path = "/upload/{id}")
//    public ResponseEntity<Boolean> addPhoto(@PathVariable(name = "id") Long id,
//                                            @RequestParam("productImage") MultipartFile file) throws IOException {
//        productImageService.uploadImage(file, id);
//        return new ResponseEntity<>(HttpStatus.ACCEPTED);
//    }
//    @GetMapping("/download/{id}")
//    public ResponseEntity<byte[]> downloadImage(@PathVariable Long id) {
//        byte[] image = productImageService.downloadImage(id);
//        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
//    }

    @GetMapping("/{id}")
    public Product get(@PathVariable ("id") long id){
        return productRepository.getOne(id);
    }
}
