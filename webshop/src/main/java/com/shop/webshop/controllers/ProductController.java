package com.shop.webshop.controllers;

import com.shop.webshop.models.CartItem;
import com.shop.webshop.models.Category;
import com.shop.webshop.models.Product;
import com.shop.webshop.repositories.ProductRepository;
import com.shop.webshop.service.ProductService;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> list()
    {
        return productRepository.findProductByActive(true, Sort.by("id"));
    }

    @PostMapping
    public Product create(@RequestBody final Product product){
        return productRepository.saveAndFlush(product);
    }

    @PutMapping
    public Product edit(@RequestBody final Product product) {
        return productRepository.saveAndFlush(product);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable ("id") long id){
        try {
            productRepository.deleteById(id);
        }catch (Exception e){
            Product product = productRepository.getById(id);
            product.setActive(false);
            productRepository.save(product);
        }
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

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(@RequestParam(required = false) Double minPrice,
                                                        @RequestParam(required = false) Double maxPrice,
                                                        @RequestParam(required = false) String category,
                                                        @RequestParam(required = false) String gender,
                                                        @RequestParam(required = false) String size) {
        List<Product> products = productRepository.findProductByActive(true, Sort.by("id"));
        List<Product> results = new ArrayList<>();
        for(Product product : products){
                if(category != null){
                    if(!product.getCategory().getId().toString().equals(category)){
                        continue;
                    }
                }
                if(minPrice != null){
                    if(product.getPrice() < minPrice){
                        continue;
                    }
                }
                if(maxPrice != null){
                    if(product.getPrice() > maxPrice){
                        continue;
                    }
                }
                if(size != null){
                    if(!product.getSize().equals(size)){
                        continue;
                    }
                }
                if(gender != null){
                    if(!product.getCategory().getGender().equals(gender)){
                        continue;
                    }
                }
                results.add(product);
        }
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable ("id") long id){
        return productRepository.getOne(id);
    }
}
