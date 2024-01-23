package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.dao.CustomerRepository;
import com.sougoumay.ecommerce.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer addNewCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer findByEmail(String email) {
        return customerRepository.findCustomerByEmail(email);
    }
}
