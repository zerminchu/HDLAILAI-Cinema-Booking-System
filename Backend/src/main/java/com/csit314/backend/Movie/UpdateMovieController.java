package com.csit314.backend.Movie;


import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller 
@RequestMapping(path = "/updatemovie") 
public class UpdateMovieController {

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody Movie movie, @PathVariable Integer id) throws SQLException {
        
        Movie existingMovie = Movie.findByMovie(movie.getTitle());
        if (existingMovie != null && existingMovie.getId() != existingMovie.getId()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Movie Title already exists");
        }

        try {
            Movie.update(movie);
            return new ResponseEntity<String>("Saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>("Not saved", HttpStatus.NOT_FOUND);
        }
    }
    
}
