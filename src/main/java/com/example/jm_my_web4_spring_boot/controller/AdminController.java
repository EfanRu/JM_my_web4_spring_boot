package com.example.jm_my_web4_spring_boot.controller;

import com.example.jm_my_web4_spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AdminController {

    private UserService userService;

    @Autowired
    private void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public ModelAndView allUser(ModelMap model) {
        model.addAttribute("listUser", userService.getAllUsers());
        ModelAndView mav = new ModelAndView();
        mav.setViewName("adminAll");
        return mav;
    }


}
