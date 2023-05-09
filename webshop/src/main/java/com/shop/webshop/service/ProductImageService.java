//package com.shop.webshop.service;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Optional;
//
//import com.shop.webshop.models.Product;
//import com.shop.webshop.repositories.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//
//@Service
//public class ProductImageService {
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    public Product uploadImage(MultipartFile file,Long Id) throws IOException {
//        Optional<Product> product = productRepository.findById(Id);
//        product.get().setImage(ImageService.compressImage(file.getBytes()));
//        return productRepository.save(product.get());
//    }
//
//    public byte[] downloadImage(Long Id){
//        Optional<Product> product = productRepository.findById(Id);
//        return ImageService.decompressImage(product.get().getImage());
//    }
//
//    public List<Product> getProducts(){
//        List<Product> products = productRepository.findAll();
//        for (Product product:products) {
//            product.setImage(this.downloadImage(product.getId()));
//        }
//        return products;
//    }
//}