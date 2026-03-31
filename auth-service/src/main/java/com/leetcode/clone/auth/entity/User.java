package com.leetcode.clone.auth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;
    private String role;
    private Integer streak = 0;
    @Column(name = "user_rank")
    private String rank = "ROOKIE";

    // Manual Getters/Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Integer getStreak() { return streak; }
    public void setStreak(Integer streak) { this.streak = streak; }
    public String getRank() { return rank; }
    public void setRank(String rank) { this.rank = rank; }

    // Manual Builder
    public static UserBuilder builder() { return new UserBuilder(); }
    public static class UserBuilder {
        private User user = new User();
        public UserBuilder username(String u) { user.setUsername(u); return this; }
        public UserBuilder email(String e) { user.setEmail(e); return this; }
        public UserBuilder password(String p) { user.setPassword(p); return this; }
        public UserBuilder role(String r) { user.setRole(r); return this; }
        public User build() { return user; }
    }
}
