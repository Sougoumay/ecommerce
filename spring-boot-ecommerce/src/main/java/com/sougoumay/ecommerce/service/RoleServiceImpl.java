package com.sougoumay.ecommerce.service;

import com.sougoumay.ecommerce.dao.RoleRepository;
import com.sougoumay.ecommerce.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findRoleById(long id) {
        return roleRepository.findById(id).orElse(null);
    }
}
