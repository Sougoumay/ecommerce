package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User findByUserName(String userName);

    void addNewUser(User newUser);
}
