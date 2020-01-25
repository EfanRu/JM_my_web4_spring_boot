package com.example.jm_my_web4_spring_boot.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MySimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (authentication
                .getAuthorities()
                .stream()
                .anyMatch(ca -> ca.getAuthority().equals("ROLE_ADMIN"))) {
            response.sendRedirect("/admin/all");
        } else {
            response.sendRedirect("/user");
        }
    }
}
