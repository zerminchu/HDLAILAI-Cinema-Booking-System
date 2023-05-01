package com.csit314.backend.Seat;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.csit314.backend.Hall.Hall;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.fasterxml.jackson.core.type.TypeReference;

import org.springframework.web.bind.annotation.RequestBody;


@Controller // This means that this class is a Controller
@RequestMapping(path = "/createseat") // This means URL's start with /useraccount (after Application path)
public class CreateSeatController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewSeat(@RequestBody Seat user) throws SQLException {
        
        try {
            Seat.save(user);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PostMapping(path = "/addAll")
    public ResponseEntity<String> addNewSeat(@RequestBody Map<String, Object> json) throws SQLException {
        System.out.println("hi");
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Hall hallToUpdate = objectMapper.convertValue(json.get("hall"), Hall.class);
            ArrayList<Seat> seats = objectMapper.convertValue(json.get("seats"), new TypeReference<ArrayList<Seat>>(){});
            Seat.saveAll(seats);
            Hall.updateNumberOfSeats(hallToUpdate);
            
            return new ResponseEntity<String>("Saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println(e);
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }
    

    /* @PostMapping(path = "/addAll") // Map ONLY POST Requests
public ResponseEntity<String> addNewSeat(@RequestBody Map<String, Object> json) throws SQLException {

    try {
        System.out.println(json.get("hall"));
        Hall hallToUpdate = (Hall) json.get("hall");
        Seat[] seats = (Seat[]) json.get("seats");
        
        Seat.saveAll(seats);
        Hall.updateNumberOfSeats(hallToUpdate.getId(), seats.length);
        
        return new ResponseEntity<String>("Saved", HttpStatus.OK);
    } catch (IllegalArgumentException e) {
        return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
    }
} */

    
}
