package com.leetcode.clone.auth.controller;

import com.leetcode.clone.auth.dto.AuthRequest;
import com.leetcode.clone.auth.dto.AuthResponse;
import com.leetcode.clone.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/debug/users")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        String message = ex.getMessage();
        log.error("Auth Error: {}", message);
        if (message != null && (message.contains("Hikari") || message.contains("Connection"))) {
            return ResponseEntity.status(503).body("Database connection timed out. Please try again in 5 seconds.");
        }
        return ResponseEntity.status(401).body(message);
    }
}
