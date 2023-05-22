package com.csit314.backend.MovieSession;
import com.csit314.backend.Seat.Seat;
import com.csit314.backend.Hall.Hall;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(path = "/viewmoviesession")
public class ViewMovieSessionController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<MovieSession>> getAllMovies() throws SQLException {
        // This returns a JSON or XML with the users
        MovieSession ms = new MovieSession();
        ArrayList<MovieSession> movieSession = ms.listAll();
        return new ResponseEntity<ArrayList<MovieSession>>(movieSession, HttpStatus.OK);
    }

    @GetMapping(path = "/hall/{hallId}")
    public ResponseEntity<ArrayList<MovieSession>> getAllMovieSessionsByHall(@PathVariable Integer hallId)
            throws SQLException {
        // This returns a JSON or XML with the MovieSessions associated with a hall
        MovieSession ms = new MovieSession();
        ArrayList<MovieSession> movieSessions = ms.listAllByHall(hallId);
        return new ResponseEntity<ArrayList<MovieSession>>(movieSessions, HttpStatus.OK);
    }

    @GetMapping(path = "/movie/{movieId}")
    public ResponseEntity<ArrayList<MovieSession>> getAllMovieSessionsByMovie(@PathVariable Integer movieId)
            throws SQLException {
        // This returns a JSON or XML with the MovieSessions associated with a hall
        MovieSession ms = new MovieSession();
        ArrayList<MovieSession> movieSessions = ms.listAllByMovie(movieId);
        return new ResponseEntity<ArrayList<MovieSession>>(movieSessions, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<MovieSession> getMovieSessionById(@PathVariable Integer id) throws SQLException {
        MovieSession ms = new MovieSession();
        MovieSession movieSession = ms.get(id);
        if (movieSession == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<MovieSession>(movieSession, HttpStatus.OK);
    }




    @GetMapping(path = "hallandseat")
        public ResponseEntity<Map<String, Object>> getHallAndSeatByMovieSessionId(@RequestParam("moviesessionid") Integer movieSessionId, @RequestParam("hallid") Integer hallId) throws SQLException {
            Seat s = new Seat();
            Hall h = new Hall();
        Hall hall = h.get(hallId);
        ArrayList<Seat> seats = s.listAllByMovieSession(movieSessionId);
        Map<String, Object> json = new HashMap<>();
        json.put("hall", hall);
        json.put("seats", seats);
        return new ResponseEntity<Map<String, Object>>(json, HttpStatus.OK);
    }
}