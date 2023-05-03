package com.csit314.backend.Hall;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(path = "/searchhall")
public class SearchHallController {
    @GetMapping
    public ResponseEntity<ArrayList<Hall>> getAllHalls(@RequestParam("q") String query)
            throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<Hall> searchResults = Hall.search(query);
        return new ResponseEntity<ArrayList<Hall>>(searchResults, HttpStatus.OK);
    }
}
