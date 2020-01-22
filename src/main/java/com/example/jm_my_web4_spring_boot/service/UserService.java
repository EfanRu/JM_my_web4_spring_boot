package com.example.jm_my_web4_spring_boot.service;

import com.example.jm_my_web4_spring_boot.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getAllUsers();
    boolean addUser(User u);
    boolean deleteUser(String id);
    boolean updateUser(String id, String firstName, String lastName, String phoneNumber, String role, String login, String password);
    boolean checkAuth(String login, String password);
    User getUserById(String id);
    User getUserByLogin(String login);
}
