package com.sougoumay.ecommerce.dto;

import com.sougoumay.ecommerce.entity.Address;
import com.sougoumay.ecommerce.entity.Customer;
import com.sougoumay.ecommerce.entity.Order;
import com.sougoumay.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;


}
