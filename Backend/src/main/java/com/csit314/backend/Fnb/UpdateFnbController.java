package com.csit314.backend.Hall;


import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller 
@RequestMapping(path = "/updatehall") 
public class UpdateHallController {

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody Hall user, @PathVariable Integer id) throws SQLException {
        if (user.getName() == null || user.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hall name cannot be empty");
        }

        Hall existingHall = Hall.findByHall(user.getName());
        if (existingHall != null && existingHall.getId() != user.getId()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hall name already exists");
        }

        try {
            Hall.update(user);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
