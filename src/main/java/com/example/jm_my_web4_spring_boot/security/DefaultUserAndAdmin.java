package com.example.jm_my_web4_spring_boot.security;

import com.example.jm_my_web4_spring_boot.model.Role;
import com.example.jm_my_web4_spring_boot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import com.example.jm_my_web4_spring_boot.service.UserService;

@Component
@PropertySource("classpath:application.properties")
@Order(3)
public class DefaultUserAndAdmin {
    @Autowired
    private UserService userService;
    @Autowired
    private Environment env;
    
    @Bean
    public void DefaultUserAndAdmin() {
        User user = new User();
        user.setLogin(env.getProperty("db.default.user.login"));
        user.setPassword(env.getProperty("db.default.user.password"));
        user.setRole(new Role("user"));
        userService.addUser(user);

        User admin = new User();
        admin.setLogin(env.getProperty("db.default.admin.login"));
        admin.setPassword(env.getProperty("db.default.admin.password"));
        admin.setRole(new Role("admin"));
        userService.addUser(admin);
    }
}
