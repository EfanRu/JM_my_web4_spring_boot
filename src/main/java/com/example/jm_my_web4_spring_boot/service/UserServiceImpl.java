package com.example.jm_my_web4_spring_boot.service;

import com.sun.istack.Nullable;
import com.example.jm_my_web4_spring_boot.dao.UserDao;
import com.example.jm_my_web4_spring_boot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    @Qualifier("md4PasswordEncoder")
    @Lazy
    private PasswordEncoder md4PasswordEncoder;


    public UserServiceImpl() {}

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userDao.getUserByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @Override
    public boolean addUser(User user) {
        User userFromDB = userDao.getUserByLogin(user.getLogin());
        if (userFromDB == null) {
            user.setPassword(md4PasswordEncoder.encode(user.getPassword()));
            userDao.addUser(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteUser(String id) {
        User user = userDao.getUserById(id);
        if (user == null) {
            return false;
        }
        userDao.deleteUser(id);
        return true;
    }

    @Override
    public boolean updateUser(String id, String firstName, String lastName, String phoneNumber, String role, String login, String password) {
        if (password != null && !password.equals("")) {
            password = md4PasswordEncoder.encode(password);
            return userDao.updateUser(id, firstName, lastName, phoneNumber, role, login, password);
        }
        return userDao.updateUser(id, firstName, lastName, phoneNumber, role, login);
    }

    @Override
    public boolean updateUser(User user) {
        String password = user.getPassword();
        if (password != null && !password.equals("")) {
            password = md4PasswordEncoder.encode(password);
            user.setPassword(password);
            return userDao.updateUser(user);
        }
        return userDao.updateUser(user.getId().toString(), user.getFirstName(), user.getLastName(), user.getPhoneNumber().toString(), user.getRole().getName(), user.getLogin());
    }

    public boolean checkAuth(String login, String password) {
        User user = userDao.getUserByLogin(login);
        if (user == null) {
            return false;
        }
        return md4PasswordEncoder.matches(password, user.getPassword());
    }

    @Override
    @Nullable
    public User getUserByLogin(String login) {
        return userDao.getUserByLogin(login);
    }

    @Override
    public User getUserById(String id) {
        User user = userDao.getUserById(id);
        return user == null ? new User() : user;
    }
}
