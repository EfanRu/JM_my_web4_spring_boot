package com.example.jm_my_web4_spring_boot.dao;

import com.example.jm_my_web4_spring_boot.model.User;

import java.util.List;

public interface UserDao {
    List<User> getAllUsers();
    boolean addUser(User u);
    boolean deleteUser(String id);
    boolean updateUser(String id, String firstName, String lastName, String phoneNumber, String role, String login, String password);
    boolean updateUser(String id, String firstName, String lastName, String phoneNumber, String role, String login);
    boolean checkAuth(String login, String password);
    User getUserByLogin(String login);
    User getUserById(String id);
}
