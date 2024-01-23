package com.sougoumay.ecommerce.controller;

import com.sougoumay.ecommerce.entity.Role;
import com.sougoumay.ecommerce.entity.User;
import com.sougoumay.ecommerce.service.SecurityService;
import com.sougoumay.ecommerce.service.UserService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/auth")
public class SecurityController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public Authentication authentication(Authentication authentication) {
        return authentication;
    }

    @PostMapping("/login")
    public Map<String, String> login(String username, String password)
    {
        return securityService.login(username,password);
    }

    @GetMapping("/current/user/{username}/roles")
    public Map<String,String> authenticateUserRoles(@PathVariable("username") String username) {
        username = username.substring(1,username.length()-1);
        User user = userService.findByUserName(username);
        String roles = "";
        for (Role role : user.getRoles() ) {
            roles += " " + role.getName();
        }
        return Map.of("roles", roles);
    }
}
