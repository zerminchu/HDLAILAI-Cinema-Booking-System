package com.csit314.backend.Seat;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewseat")
public class ViewSeatController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<Seat>> getAllSeats() throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<Seat> Seats = Seat.listAll();
        return new ResponseEntity<ArrayList<Seat>>(Seats, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public Seat getSeatById(@PathVariable Integer id) throws SQLException {
        return Seat.get(id);
    }

    @GetMapping(path = "/all/{hallId}")
    public ResponseEntity<ArrayList<Seat>> getAllSeatsByHallId(@PathVariable Integer hallId) throws SQLException {
        // This returns a JSON with the users
        ArrayList<Seat> Seats = Seat.listAllByHallId(hallId);
        return new ResponseEntity<ArrayList<Seat>>(Seats, HttpStatus.OK);
    }
    
}
