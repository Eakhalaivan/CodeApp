package com.leetcode.clone.auth.service;

import com.leetcode.clone.auth.dto.AuthRequest;
import com.leetcode.clone.auth.dto.AuthResponse;
import com.leetcode.clone.auth.entity.User;
import com.leetcode.clone.auth.repository.UserRepository;
import com.leetcode.clone.auth.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(AuthRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();
        userRepository.save(user);
        
        String token = jwtUtils.generateToken(user.getUsername(), user.getRole());
        return new AuthResponse(token, user.getId(), user.getUsername(), user.getRole());
    }

    public AuthResponse login(AuthRequest request) {
        String identifier = (request.getUsername() != null && !request.getUsername().isBlank()) 
                ? request.getUsername() : request.getEmail();

        User user = userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new RuntimeException("User not found: " + identifier));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtUtils.generateToken(user.getUsername(), user.getRole());
        return new AuthResponse(token, user.getId(), user.getUsername(), user.getRole());
    }

    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
