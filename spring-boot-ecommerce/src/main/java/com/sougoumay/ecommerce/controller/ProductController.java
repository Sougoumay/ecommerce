package com.sougoumay.ecommerce.controller;

import com.sougoumay.ecommerce.entity.ImageModel;
import com.sougoumay.ecommerce.entity.Product;
import com.sougoumay.ecommerce.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;


    @PostMapping( value = {"/api/products/add"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addNewProduct(@RequestPart("product") Product product, @RequestPart("imageFile")MultipartFile file){
        System.out.println("Received product data in controller: " + product);
        System.out.println("Param file " + file);
        try {
            ImageModel imageModel = new ImageModel(file.getOriginalFilename(),file.getContentType(),file.getBytes());;
            product.setImage(imageModel);
            System.out.println("product " + product);
            System.out.println("Image model " + imageModel);
            System.out.println("Param file " + file);
            return productService.addProduct(product);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return null ;
        }
    }



}
