package com.example.jm_my_web4_spring_boot.security;

import org.springframework.core.annotation.Order;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

@Order(2)
public class SecurityInit extends AbstractSecurityWebApplicationInitializer {

}
