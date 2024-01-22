package com.sougoumay.ecommerce.service;

import java.util.Map;

public interface SecurityService {
    public Map<String, String> login(String userName, String password);
}
