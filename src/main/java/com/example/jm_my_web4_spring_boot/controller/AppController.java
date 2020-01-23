package com.example.jm_my_web4_spring_boot.controller;

import com.example.jm_my_web4_spring_boot.model.Role;
import com.example.jm_my_web4_spring_boot.model.User;
import com.example.jm_my_web4_spring_boot.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@Controller
public class AppController {
    private static final Logger LOG = LoggerFactory.getLogger(AppController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/", "/login"}, method = RequestMethod.GET)
    public String login(Principal principal) {
        LOG.info("Inside login or welcome page!");
        return principal == null ? "login" : "redirect:/user";
    }

    @RequestMapping(value = "/admin/add", method = RequestMethod.POST)
    public String add(HttpServletRequest req) {
        LOG.info("Inside add!");
        userService.addUser(new User(
                req.getParameter("firstName"),
                req.getParameter("lastName"),
                req.getParameter("login"),
                req.getParameter("password"),
                Long.parseLong(req.getParameter("phoneNumber")),
                new Role(req.getParameter("role"))));
        return "redirect:/admin/all";
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String user(ModelMap model) {
        Authentication auth;
        try {
            auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            model.addAttribute(user);
        } catch (ClassCastException e) {
            e.printStackTrace();
            model.addAttribute("msg", "This user don't present in DB");
            return "error";
        }
        return "user";
    }

    @RequestMapping(value = "/admin/all", method = RequestMethod.GET)
    public String allUser(ModelMap model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("listUser", users);
        return "adminAll";
    }

    @RequestMapping(value = "/admin/edit", method = RequestMethod.GET)
    public String editUserPage(@ModelAttribute("user.id") String id, ModelMap model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "editUsers";
    }

    @RequestMapping(value = "/admin/edit", method = RequestMethod.POST)
    public String editUser(@ModelAttribute("user") User user, HttpServletRequest req) {
        userService.updateUser(user);
//        userService.updateUser(
//                req.getParameter("id"),
//                req.getParameter("firstName"),
//                req.getParameter("lastName"),
//                req.getParameter("phoneNumber"),
//                req.getParameter("role"),
//                req.getParameter("login"),
//                req.getParameter("password"));
        return "redirect:/admin/all";
    }

    @RequestMapping(value = "/admin/delete", method = RequestMethod.GET)
    public String delUser(@ModelAttribute("id") String id) {
        userService.deleteUser(id);
        return "redirect:/admin/all";
    }
}
