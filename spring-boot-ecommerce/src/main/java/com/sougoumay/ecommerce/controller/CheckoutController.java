package com.sougoumay.ecommerce.controller;

import com.sougoumay.ecommerce.dto.Purchase;
import com.sougoumay.ecommerce.dto.PurchaseResponse;
import com.sougoumay.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/checkout")
@RestController
@CrossOrigin("http://localhost:4200")
public class CheckoutController {
    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }
}
