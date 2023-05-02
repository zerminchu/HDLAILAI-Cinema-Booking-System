package com.csit314.backend.MovieSession;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createmoviesession")
public class CreateMovieSessionController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<String> addNewMovieSession(@RequestBody MovieSession movieSession) throws SQLException {
        try {
            String result = MovieSession.save(movieSession);
            if (result != "Success")
                return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<String>("saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}