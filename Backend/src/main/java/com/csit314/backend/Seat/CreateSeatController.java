package com.csit314.backend.Seat;

import java.sql.SQLException;
import java.util.ArrayList;
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

    @PostMapping(path = "/addAll")
    public ResponseEntity<String> addNewSeats(@RequestBody Map<String, Object> json) throws SQLException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Hall hallToUpdate = objectMapper.convertValue(json.get("hall"), Hall.class);
            ArrayList<Seat> seats = objectMapper.convertValue(json.get("seats"), new TypeReference<ArrayList<Seat>>() {
            });
            Seat s = new Seat();
            Hall h = new Hall();
            // 1 controller talks to 2 entities
            s.saveAll(seats);
            h.updateNumberOfSeats(hallToUpdate);

            return new ResponseEntity<String>("Saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println(e);
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

}
