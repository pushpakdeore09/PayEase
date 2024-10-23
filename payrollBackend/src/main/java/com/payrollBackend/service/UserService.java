package com.payrollBackend.service;

import com.payrollBackend.model.User;
import com.payrollBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> createUser(User user){
        User isExist = userRepository.findByEmail(user.getEmail());

        if(isExist!=null){
           return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }
        User newUser = new User();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(hashedPassword);

        userRepository.save(newUser);
        return new ResponseEntity<>("Register Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> loginUser(String email, String password) {

        User existingUser = userRepository.findByEmail(email);

        if (existingUser == null) {
            return new ResponseEntity<>("User does not exist!", HttpStatus.BAD_REQUEST);
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean passwordMatch = passwordEncoder.matches(password, existingUser.getPassword());

        if (passwordMatch && email.equals(existingUser.getEmail())) {
            existingUser.setPassword(null);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);

        }
        return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }
}
