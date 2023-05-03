package com.csit314.backend.MovieSession;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/updatemoviesession") // This means URL's start with /useraccount (after Application path)
public class UpdateMovieSessionController {
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody MovieSession movieSession, @PathVariable Integer id)
            throws SQLException {
        if (MovieSession.update(movieSession)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
