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
        Seat s = new Seat();
        // This returns a JSON or XML with the users
        ArrayList<Seat> Seats = s.listAll();
        return new ResponseEntity<ArrayList<Seat>>(Seats, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable Integer id) throws SQLException {
        Seat s = new Seat();
        Seat result = s.get(id);
        return new ResponseEntity<Seat>(result, HttpStatus.OK);
    }

    @GetMapping(path = "/hall/{hallId}")
    public ResponseEntity<ArrayList<Seat>> getAllSeatsByHallId(@PathVariable Integer hallId) throws SQLException {
        // This returns a JSON with the users
        Seat s = new Seat();
        ArrayList<Seat> Seats = s.listAllByHallId(hallId);
        return new ResponseEntity<ArrayList<Seat>>(Seats, HttpStatus.OK);
    }

    @GetMapping(path = "/moviesession/{movieSessionId}")
    public ResponseEntity<ArrayList<Seat>> getAllSeatsByMovieSession(@PathVariable Integer movieSessionId)
            throws SQLException {
        Seat seat = new Seat();
        ArrayList<Seat> seats = seat.listAllByMovieSession(movieSessionId);
        return new ResponseEntity<ArrayList<Seat>>(seats, HttpStatus.OK);
    }
}
