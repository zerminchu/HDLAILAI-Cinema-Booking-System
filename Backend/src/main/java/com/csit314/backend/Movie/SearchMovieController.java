package com.csit314.backend.Movie;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(path = "/searchmovie")
public class SearchMovieController {
    @GetMapping
    public ResponseEntity<ArrayList<Movie>> getAllMovies(@RequestParam("q") String query)
            throws SQLException {
        Movie mv = new Movie();
        // This returns a JSON or XML with the users
        ArrayList<Movie> searchResults = mv.search(query);
        return new ResponseEntity<ArrayList<Movie>>(searchResults, HttpStatus.OK);
    }
}
