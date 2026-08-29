package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Entity.Users;
import com.weaveflow.weavers_management.Enum.Role;
import com.weaveflow.weavers_management.Repository.UserRepository;
import com.weaveflow.weavers_management.Security.JwtUtil;
import com.weaveflow.weavers_management.dto.LoginRequestDTO;
import com.weaveflow.weavers_management.dto.LoginResponseDTO;
import com.weaveflow.weavers_management.dto.RegisterRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO reqDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(reqDTO.getUsername(), reqDTO.getPassword())
            );
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("Invalid username or password");
        }

        Users user = userRepository.findByUsername(reqDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        String token = jwtUtil.generateToken(reqDTO.getUsername());
        return new LoginResponseDTO(token, user.getUsername(), user.getRole().name(), "Login successful");
    }

    // Open for now so you can create your first user. Once you have the
    // account(s) you need, either delete this endpoint or lock it behind
    // an existing ADMIN login — leaving it public long-term lets anyone
    // create an account.
    //
    // New accounts default to STAFF, never ADMIN, so this endpoint can't be
    // used to self-grant admin access. To create your first ADMIN, register
    // normally then run one SQL update:
    //   UPDATE users SET role = 'ADMIN' WHERE username = 'youraccount';
    @PostMapping("/register")
    public LoginResponseDTO register(@RequestBody RegisterRequestDTO reqDTO) {
        if (userRepository.existsByUsername(reqDTO.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        Users user = new Users();
        user.setUsername(reqDTO.getUsername());
        user.setPassword(passwordEncoder.encode(reqDTO.getPassword()));
        user.setRole(Role.STAFF);
        user.setActiveStatus(true);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername());
        return new LoginResponseDTO(token, user.getUsername(), user.getRole().name(), "Registered successfully");
    }
}