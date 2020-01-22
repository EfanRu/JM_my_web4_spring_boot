package com.example.jm_my_web4_spring_boot.security;

import com.example.jm_my_web4_spring_boot.model.Role;
import com.example.jm_my_web4_spring_boot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import com.example.jm_my_web4_spring_boot.service.UserService;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
        return new MySimpleUrlAuthenticationSuccessHandler();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
        auth.userDetailsService(userService);
        userService.addUser(new User("default user", "default user", "user", "user", 99L, new Role("user")));
        userService.addUser(new User("default admin", "default admin", "admin", "admin", 99L, new Role("admin")));
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                    .antMatchers("/admin/**").hasRole("ADMIN")
                    .antMatchers("/user/**").authenticated()
                    .antMatchers("/login").anonymous()
                .and().formLogin()
                    .loginPage("/login")
                    .loginProcessingUrl("/authorization")
                    .successHandler(myAuthenticationSuccessHandler())
                .and().logout()
                    .permitAll()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login")
                    .invalidateHttpSession(true)
                    .deleteCookies();
    }
}
