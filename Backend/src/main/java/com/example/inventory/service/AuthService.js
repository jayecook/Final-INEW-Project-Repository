package com.example.inventory.service;

import com.example.inventory.dto.LoginRequest;
import com.example.inventory.dto.LoginResponse;
import com.example.inventory.model.User;
import com.example.inventory.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(false, "Please enter a valid username and password.", null);
        }

        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            return new LoginResponse(false, "Only admin users can log in.", user.getRole());
        }

        return new LoginResponse(true, "Login successful.", user.getRole());}}
