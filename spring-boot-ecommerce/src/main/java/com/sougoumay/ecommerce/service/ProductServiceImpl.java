package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.dao.ProductRepository;
import com.sougoumay.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;
    @Override
    public Product addProduct(Product product) {

        return productRepository.save(product);
    }
}
