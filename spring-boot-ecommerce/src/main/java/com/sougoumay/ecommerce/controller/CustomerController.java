package com.sougoumay.ecommerce.controller;

import com.sougoumay.ecommerce.entity.Customer;
import com.sougoumay.ecommerce.entity.Role;
import com.sougoumay.ecommerce.entity.User;
import com.sougoumay.ecommerce.service.CustomerService;
import com.sougoumay.ecommerce.service.RoleService;
import com.sougoumay.ecommerce.service.SecurityService;
import com.sougoumay.ecommerce.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SecurityService securityService;

    @Transactional
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Customer customer) throws Exception {
        String email = customer.getEmail();
        User user = userService.findByUserName(email);

        if (user != null) {
            throw new Exception("Cet email est déjà utilisé");
        }

        Customer addedCustomer = customerService.addNewCustomer(customer);

        Set<Role> roles = new HashSet<>();
        Role role = roleService.findRoleById(4);
        roles.add(role);

        User newUser = new User();
//        newUser.setFirstName(addedCustomer.getFirstName());
//        newUser.setLastName(addedCustomer.getLastName());
        newUser.setUserName(addedCustomer.getEmail());
        newUser.setPassword(passwordEncoder.encode(addedCustomer.getPassword()));
        newUser.setActive(true);
        newUser.setRoles(roles);
        userService.addNewUser(newUser);

        return securityService.login(addedCustomer.getEmail(), addedCustomer.getPassword());

    }

}
