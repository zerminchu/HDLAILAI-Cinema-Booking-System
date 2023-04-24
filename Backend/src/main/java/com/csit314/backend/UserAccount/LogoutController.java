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
@RequestMapping(path = "/logout") // This means URL's start with /useraccount (after Application path)
public class LogoutController {
    @PostMapping
    public ResponseEntity<String> logout(HttpSession session) {
        // Get the current session and invalidate it
        if (session != null) {
            session.invalidate();
        }
        // Redirect the user to the login page
        return new ResponseEntity<String>("Logout successful", HttpStatus.OK);
    }
}