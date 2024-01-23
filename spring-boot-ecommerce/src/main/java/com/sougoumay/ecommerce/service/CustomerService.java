package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.entity.Customer;

public interface CustomerService {
    Customer addNewCustomer(Customer customer);

    Customer findByEmail(String email);
}
