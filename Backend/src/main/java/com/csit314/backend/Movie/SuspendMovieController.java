package com.csit314.backend.Movie;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/suspendmovie") // This means URL's start with /useraccount (after Application path)
public class SuspendMovieController {
    @DeleteMapping("/{id}")
    public ResponseEntity<?> suspend(@PathVariable Integer id) throws SQLException {
        Movie mv = new Movie();
        if (mv.suspend(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/unsuspend/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id) throws SQLException {
        Movie mv = new Movie();
        if (mv.unsuspend(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
