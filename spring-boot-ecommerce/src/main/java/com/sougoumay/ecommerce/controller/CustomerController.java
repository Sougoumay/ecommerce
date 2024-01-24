package com.sougoumay.ecommerce.controller;

import com.sougoumay.ecommerce.dto.CustomerDto;
import com.sougoumay.ecommerce.entity.Customer;
import com.sougoumay.ecommerce.entity.Role;
import com.sougoumay.ecommerce.entity.User;
import com.sougoumay.ecommerce.request.CustomerRequest;
import com.sougoumay.ecommerce.service.CustomerService;
import com.sougoumay.ecommerce.service.RoleService;
import com.sougoumay.ecommerce.service.SecurityService;
import com.sougoumay.ecommerce.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public Map<String, String> register(@RequestBody CustomerRequest request) throws Exception {
        String email = request.getEmail();
        User user = userService.findByUserName(email);

        if (user != null) {
            throw new Exception("Cet email est déjà utilisé");
        }

        System.out.println(request);

        Customer newCustomer = new Customer();
        newCustomer.setEmail(request.getEmail());
        newCustomer.setFirstName(request.getFirstName());
        newCustomer.setLastName(request.getLastName());

        newCustomer = customerService.addNewCustomer(newCustomer);

        Set<Role> roles = new HashSet<>();
        Role role = roleService.findRoleById(4);
        roles.add(role);

        User newUser = new User();
//        newUser.setFirstName(addedCustomer.getFirstName());
//        newUser.setLastName(addedCustomer.getLastName());
        newUser.setUserName(newCustomer.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setActive(true);
        newUser.setRoles(roles);
        userService.addNewUser(newUser);

        return securityService.login(request.getEmail(), request.getPassword());

    }

    @GetMapping("/current/{email}")
    public CustomerDto getCurrentCustomer(@PathVariable("email") String email) {
        email = email.substring(1,email.length()-1);
        System.out.println("email = " + email);
        Customer customer = customerService.findByEmail(email);
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(customer.getId());
        customerDto.setEmail(customer.getEmail());
        customerDto.setFirstName(customer.getFirstName());
        customerDto.setLastName(customer.getLastName());

        System.out.println(customer.toString());
        System.out.println(customerDto.toString());
        return customerDto;

         résoudre liée à la sérialisation lorsque le client a déjà fait des commandes precedemment
    }

}
