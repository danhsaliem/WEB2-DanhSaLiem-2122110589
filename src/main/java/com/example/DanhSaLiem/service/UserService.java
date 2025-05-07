package com.example.DanhSaLiem.service;

import com.example.DanhSaLiem.domain.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> getUserById(Long id);
    List<User> getAllUsers();
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long userId);
    void saveUser(User user);
    

}
