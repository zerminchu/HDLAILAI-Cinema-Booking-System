package com.csit314.backend.UserAccount;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpSession;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/login") // This means URL's start with /useraccount (after Application path)
public class LoginController {

    @PostMapping
    public ResponseEntity<String> validateLogin(@RequestBody UserAccount user, HttpSession session) {
        try {
            if (user.getUserProfile().getId() == -1) {
                return new ResponseEntity<String>("Profile not selected", HttpStatus.BAD_REQUEST);
            }
            // Check email empty or password empty
            if (user.getEmail() == "") {
                return new ResponseEntity<String>("Empty email", HttpStatus.BAD_REQUEST);
            }
            if (user.getPassword() == "") {
                return new ResponseEntity<String>("Empty password", HttpStatus.BAD_REQUEST);
            }
            String loginResult = UserAccount.login(user);
            switch (loginResult) {
                case "User/Role is invalid":
                case "User has been suspended.":
                case "Incorrect Password":
                case "Error":
                    return new ResponseEntity<String>(loginResult, HttpStatus.BAD_REQUEST);
                default:
                    // Set the token for the session from this client
                    session.setAttribute("token", loginResult);
                    // Return an authorization token to the client
                    return new ResponseEntity<String>(loginResult, HttpStatus.OK);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<String>("Invalid submission", HttpStatus.BAD_REQUEST);
        }
    }
}
