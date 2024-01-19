package com.sougoumay.ecommerce.dao;

import com.sougoumay.ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findRoleByName(String name);
}
