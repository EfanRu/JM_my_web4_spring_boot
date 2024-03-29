package com.example.jm_my_web4_spring_boot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@Controller
public class LoginController {

    @GetMapping({"/", "/login"})
    public ModelAndView login(Principal principal) {
        ModelAndView mav = new ModelAndView();
        if (principal == null) {
            mav.setViewName("login");
        } else {
            mav.setViewName("user");
        }
        return mav;
    }
}
