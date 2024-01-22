package com.sougoumay.ecommerce.dao;

import com.sougoumay.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findCustomerByEmail(@Param("email") String email);

}
