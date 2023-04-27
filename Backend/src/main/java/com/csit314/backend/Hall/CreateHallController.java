package com.csit314.backend.Hall;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller // This means that this class is a Controller
@RequestMapping(path = "/createhall") // This means URL's start with /useraccount (after Application path)
public class CreateHallController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody Hall user) throws SQLException {
        if (user.getName() == null || user.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hall name cannot be empty");
        }

           // Check for duplicated profile name
           if (Hall.findByHall(user.getName()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hall name already exists");
        }
        try {
            Hall.save(user);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
}
