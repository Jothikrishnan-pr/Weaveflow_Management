package com.weaveflow.weavers_management.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String username;
    private String password;
}