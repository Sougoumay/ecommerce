package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.dao.CustomerRepository;
import com.sougoumay.ecommerce.dao.ProductRepository;
import com.sougoumay.ecommerce.dao.UserRepository;
import com.sougoumay.ecommerce.dto.Purchase;
import com.sougoumay.ecommerce.dto.PurchaseResponse;
import com.sougoumay.ecommerce.entity.Customer;
import com.sougoumay.ecommerce.entity.Order;
import com.sougoumay.ecommerce.entity.OrderItem;
import com.sougoumay.ecommerce.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = UUID.randomUUID().toString();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
//        orderItems.forEach(item -> order.add(item));
        orderItems.forEach(order::add);

        // populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();

//        // check if this is an existing customer
//        String email = customer.getEmail();
//
//        Customer customerFromDB = customerRepository.findCustomerByEmail(email);
//
//        if (customerFromDB != null) {
//            customer = customerFromDB;
//        } else {
//
//        }

        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        // update product quantity
        orderItems.forEach(item -> {
            Optional<Product> optionalProduct = productRepository.findById(item.getProductId());
            if (optionalProduct.isPresent()) {
                Product product = optionalProduct.get();
                product.setUnitsInStock(product.getUnitsInStock()- item.getQuantity());
                productRepository.save(product);
            }
        });

        return new PurchaseResponse(orderTrackingNumber);
    }

}
