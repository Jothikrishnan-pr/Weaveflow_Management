package com.weaveflow.weavers_management.Entity;

import com.weaveflow.weavers_management.Enum.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Column(name="password_hash")
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean activeStatus;
}