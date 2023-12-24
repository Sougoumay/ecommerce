package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.dto.Purchase;
import com.sougoumay.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
