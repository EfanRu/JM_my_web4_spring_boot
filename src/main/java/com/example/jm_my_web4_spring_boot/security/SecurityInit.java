package com.example.jm_my_web4_spring_boot.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

@Order(2)
public class SecurityInit extends AbstractSecurityWebApplicationInitializer {
//Old code for mentor
    //    @Autowired
//    PasswordEncoder passwordEncoder;

//    @Autowired
//    @Qualifier("md4PasswordEncoder")
//    private PasswordEncoder passwordEncoder;

//    @Bean
//    public BCryptPasswordEncoder md4PasswordEncoder() {
//        return new BCryptPasswordEncoder();
//    }



}
