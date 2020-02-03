package com.example.jm_my_web4_spring_boot.controller;

import com.example.jm_my_web4_spring_boot.model.AjaxResponseBody;
import com.example.jm_my_web4_spring_boot.model.User;
import com.example.jm_my_web4_spring_boot.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.ModelMap;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@Controller
@RestController
public class AppController {
    private static final Logger LOG = LoggerFactory.getLogger(AppController.class);

    @Autowired
    private UserService userService;

//    @RequestMapping(value = {"/", "/login"}, method = RequestMethod.GET)
//    public String login(Principal principal) {
//    public String login(Principal principal) {
//        return principal == null ? "login" : "redirect:/user";
//    }
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

//    @RequestMapping(value = "/admin/add", method = RequestMethod.POST)
//    public String add(HttpServletRequest req) {
//        userService.addUser(new User(
//                req.getParameter("firstName"),
//                req.getParameter("lastName"),
//                req.getParameter("login"),
//                req.getParameter("password"),
//                Long.parseLong(req.getParameter("phoneNumber")),
//                new Role(req.getParameter("role"))));
//        userService.addUser(user);
//        return "redirect:/admin";

//    @PostMapping("/admin")
//    public User addUser(@RequestBody User user) {
//        userService.addUser(user);
//        return user;
//    }


    @PostMapping("/admin")
    public ResponseEntity<?> addUser(@Valid @RequestBody User user, Errors errors) {
        AjaxResponseBody result = new AjaxResponseBody();
        ArrayList<User> list = new ArrayList<>();

        if (errors.hasErrors()) {

            result.setMsg(errors.getAllErrors()
                    .stream().map(x -> x.getDefaultMessage())
                    .collect(Collectors.joining(",")));

            return ResponseEntity.badRequest().body(result);

        }

        if (userService.addUser(user)) {
            result.setMsg("success");
        } else {
            result.setMsg("no user found!");
        }
        list.add(user);
        result.setResult(list);

        return ResponseEntity.ok(result);
    }

//    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @GetMapping("/user")
    public ModelAndView user(ModelMap model) {
        Authentication auth;
        ModelAndView mav = new ModelAndView();
        try {
            auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            model.addAttribute(user);
        } catch (ClassCastException e) {
            e.printStackTrace();
            model.addAttribute("msg", "This user don't present in DB");
            mav.setViewName("error");
        }
        mav.setViewName("user");
        return mav;
    }

//    @RequestMapping(value = "/admin/all", method = RequestMethod.GET)
//    public String allUser(ModelMap model) {
//        List<User> users = userService.getAllUsers();
//        model.addAttribute("listUser", users);
//        return "adminAll";

    @GetMapping("/admin")
//    public List<User> allUser() {
//        return userService.getAllUsers();
//    }
    public ModelAndView allUser(ModelMap model) {
        model.addAttribute("listUser", userService.getAllUsers());
        ModelAndView mav = new ModelAndView();
        mav.setViewName("adminAll");
        return mav;
    }

    @GetMapping("/admin/all")
    public List<User> allUser() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/admin/edit", method = RequestMethod.GET)
    public ModelAndView editUserPage(@ModelAttribute("id") String id, ModelMap model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("editUsers");
        return mav;
    }
//
//    @GetMapping("/admin/edit/{id}")
//    public User editUserPage(@ModelAttribute("id") String id) {
//        return userService.getUserById(id);
//    }

//    @RequestMapping(value = "/admin/edit", method = RequestMethod.POST)
//    public String editUser(/*@ModelAttribute("user") User user,*/ HttpServletRequest req) {
//        userService.updateUser(
//                req.getParameter("id"),
//                req.getParameter("firstName"),
//                req.getParameter("lastName"),
//                req.getParameter("phoneNumber"),
//                req.getParameter("role"),
//                req.getParameter("login"),
//                req.getParameter("password"));
//        return "redirect:/admin/all";

    @PutMapping(value = "/admin/{id}")
    public User editUser(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }

//    @RequestMapping(value = "/admin/delete", method = RequestMethod.GET)
    @DeleteMapping("/admin/{id}")
    public void delUser(@PathVariable String id) {
        userService.deleteUser(id);
//        return "redirect:/admin/all";
    }
}
