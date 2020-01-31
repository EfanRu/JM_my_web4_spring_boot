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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

//@Controller
@RestController
public class AppController {
    private static final Logger LOG = LoggerFactory.getLogger(AppController.class);

    @Autowired
    private UserService userService;

//    @RequestMapping(value = {"/", "/login"}, method = RequestMethod.GET)
    @GetMapping({"/", "/login"})
//    public String login(Principal principal) {
    public String login(Principal principal) {
        return principal == null ? "login" : "redirect:/user";
    }

//    @RequestMapping(value = "/admin/add", method = RequestMethod.POST)
    @PostMapping("/users")
//    public String add(HttpServletRequest req) {
    public String add(@RequestBody User user) {
//        userService.addUser(new User(
//                req.getParameter("firstName"),
//                req.getParameter("lastName"),
//                req.getParameter("login"),
//                req.getParameter("password"),
//                Long.parseLong(req.getParameter("phoneNumber")),
//                new Role(req.getParameter("role"))));
        userService.addUser(user);
        return "redirect:/admin";
    }

//    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @GetMapping("/user")
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

//    @RequestMapping(value = "/admin/all", method = RequestMethod.GET)
    @GetMapping("/admin")
    public String allUser(ModelMap model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("listUser", users);
        return "adminAll";
    }

//    @RequestMapping(value = "/admin/edit", method = RequestMethod.GET)
    @GetMapping("/admin/edit")
    public String editUserPage(@ModelAttribute("id") String id, ModelMap model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "editUsers";
    }

//    @RequestMapping(value = "/admin/edit", method = RequestMethod.POST)
    @PutMapping(value = "/admin/edit/{id}")
//    public String editUser(/*@ModelAttribute("user") User user,*/ HttpServletRequest req) {
    public String editUser(@RequestBody User user) {
        userService.updateUser(user);
//        userService.updateUser(
//                req.getParameter("id"),
//                req.getParameter("firstName"),
//                req.getParameter("lastName"),
//                req.getParameter("phoneNumber"),
//                req.getParameter("role"),
//                req.getParameter("login"),
//                req.getParameter("password"));
//        return "redirect:/admin/all";
        return "redirect:/admin";
    }

//    @RequestMapping(value = "/admin/delete", method = RequestMethod.GET)
    @DeleteMapping("/admin/{id}")
    public String delUser(@PathVariable String id) {
        userService.deleteUser(id);
//        return "redirect:/admin/all";
        return "redirect:/admin";
    }
}
