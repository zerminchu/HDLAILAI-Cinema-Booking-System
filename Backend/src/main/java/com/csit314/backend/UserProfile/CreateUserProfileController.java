package com.csit314.backend.UserProfile;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createuserprofile") // This means URL's start with /useraccount (after Application path)
public class CreateUserProfileController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody UserProfile user) throws SQLException {

        // Check for duplicated profile name
        if (UserProfile.findByProfileName(user.getProfileName()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile name already exists");
        }

        try {
            UserProfile.save(user);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
