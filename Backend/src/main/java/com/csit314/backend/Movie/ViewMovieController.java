package com.csit314.backend.Movie;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewmovie")
public class ViewMovieController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<Movie>> getAllMovies() throws SQLException {
        // This returns a JSON or XML with the users
        Movie mv = new Movie();
        ArrayList<Movie> viewMovies = mv.listAll();
        return new ResponseEntity<ArrayList<Movie>>(viewMovies, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Integer id) throws SQLException {
        Movie mv = new Movie();
        Movie result = mv.get(id);
        return new ResponseEntity<Movie>(result, HttpStatus.OK);
    }

}
