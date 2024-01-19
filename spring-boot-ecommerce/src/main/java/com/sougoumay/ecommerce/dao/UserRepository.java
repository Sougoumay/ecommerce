package com.sougoumay.ecommerce.dao;

import com.sougoumay.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUserName(String userName);
}
