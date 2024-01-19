package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    public User findByUserName(String userName);
}
