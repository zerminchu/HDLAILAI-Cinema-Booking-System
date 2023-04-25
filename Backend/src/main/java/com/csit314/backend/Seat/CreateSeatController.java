package com.csit314.backend.Seat;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller // This means that this class is a Controller
@RequestMapping(path = "/createseat") // This means URL's start with /useraccount (after Application path)
public class CreateSeatController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody Seat user) throws SQLException {
        
        try {
            Seat.save(user);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

        @PostMapping(path = "/addAll") // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody Seat[] seats) throws SQLException {
        
        try {
            Seat.saveAll(seats);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
}
