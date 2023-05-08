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
        ArrayList<Movie> viewMovies = Movie.listAll();
        return new ResponseEntity<ArrayList<Movie>>(viewMovies, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Integer id) throws SQLException {
        Movie movie = Movie.get(id);
        if (movie == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Movie>(movie, HttpStatus.OK);
    }
    
}
