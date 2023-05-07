package com.csit314.backend.Movie;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createmovie") // This means URL's start with /useraccount (after Application path)
public class CreateMovieController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewMovie(@RequestBody Movie movie) throws SQLException {
        Movie mv = new Movie();
        // Check for duplicated profile name
        if (mv.findByMovie(movie.getTitle()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Movie title already exists");
        }
        try {
            mv.save(movie);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
