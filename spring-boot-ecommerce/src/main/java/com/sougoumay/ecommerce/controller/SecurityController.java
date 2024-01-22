package com.sougoumay.ecommerce.controller;

import com.sougoumay.ecommerce.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/profile")
    public Authentication authentication(Authentication authentication) {
        return authentication;
    }

    @PostMapping("/login")
    public Map<String, String> login(String username, String password)
    {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username,password)
//        );
//
//        Instant instant = Instant.now();
//        String scope = authentication
//                .getAuthorities()
//                .stream()
//                .map(authority -> authority.getAuthority())
//                .collect(Collectors.joining(" "));
//        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
//                .issuedAt(instant)
//                .expiresAt(instant.plus(10, ChronoUnit.MINUTES))
//                .subject(username)
//                .claim("scope",scope)
//                .build();
//
//        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters
//                .from(
//                        JwsHeader.with(MacAlgorithm.HS512).build(),
//                        jwtClaimsSet
//                );
//
//        String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
//
//        return Map.of("access-token", jwt);

        return securityService.login(username,password);

    }
}
