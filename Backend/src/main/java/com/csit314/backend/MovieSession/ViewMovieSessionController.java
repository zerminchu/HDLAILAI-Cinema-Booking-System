package com.csit314.backend.MovieSession;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @GetMapping(path = "/{id}")
    public ResponseEntity<MovieSession> getMovieSessionById(@PathVariable Integer id) throws SQLException {
        MovieSession ms = new MovieSession();
        MovieSession movieSession = ms.get(id);
        if (movieSession == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<MovieSession>(movieSession, HttpStatus.OK);
    }
}