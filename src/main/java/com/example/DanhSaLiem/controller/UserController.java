package com.example.DanhSaLiem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DanhSaLiem.domain.*;
import com.example.DanhSaLiem.controller.jwt.*;
import com.example.DanhSaLiem.dto.Login;
import com.example.DanhSaLiem.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // Lưu tạm token đăng ký để xác minh khi login
    private final Map<String, String> registrationTokens = new HashMap<>();

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        user.setRole("CUSTOMER");
        User savedUser = userService.createUser(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());

        // Lưu token để kiểm tra khi login
        registrationTokens.put(savedUser.getEmail(), token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Đăng ký thành công");
        // response.put("token", token);
        response.put("email", savedUser.getEmail());
        response.put("role", savedUser.getRole());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Login loginRequest) {
        Optional<User> userOptional = userService.getAllUsers().stream()
            .filter(u -> u.getEmail().equals(loginRequest.getEmail()))
            .findFirst();
    
        if (userOptional.isPresent()) {
            User user = userOptional.get();
    
            // Kiểm tra mật khẩu
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String newToken = jwtUtil.generateToken(user.getEmail());
    
                Map<String, String> response = new HashMap<>();
                response.put("message", "Đăng nhập thành công");
                response.put("token", newToken);
                response.put("email", user.getEmail());
                response.put("userId", String.valueOf(user.getId()));  // Add userId here
                response.put("role", user.getRole()); // trả thêm quyền
                return ResponseEntity.ok(response);
            }
        }
    
        return ResponseEntity.status(401).body(Map.of("message", "Email hoặc mật khẩu không đúng"));
    }
    @GetMapping
public List<User> getAllUsers() {
    return userService.getAllUsers();
}

    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }
    @PutMapping("/{id}")
public ResponseEntity<Map<String, String>> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
    Optional<User> userOptional = userService.getUserById(id);

    if (userOptional.isPresent()) {
        User existingUser = userOptional.get();

        // Cập nhật thông tin (bạn có thể chọn trường nào được sửa)
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());

        // Nếu có mật khẩu mới thì mã hóa lại
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        userService.saveUser(existingUser);

        return ResponseEntity.ok(Map.of(
            "message", "Cập nhật người dùng thành công",
            "userId", String.valueOf(id)
        ));
    } else {
        return ResponseEntity.status(404).body(Map.of("message", "Người dùng không tồn tại"));
    }
}
}