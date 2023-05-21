package com.csit314.backend.UserAccount;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpSession;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/login") // This means URL's start with /useraccount (after Application path)
public class LoginController {

    @PostMapping
    public ResponseEntity<String> validateLogin(@RequestBody UserAccount user, HttpSession session) {
        try {
            UserAccount ua = new UserAccount();
            String loginResult = ua.login(user);
            switch (loginResult) {
                case "User/Profile is invalid":
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
