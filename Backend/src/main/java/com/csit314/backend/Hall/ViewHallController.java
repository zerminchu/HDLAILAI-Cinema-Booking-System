package com.csit314.backend.Hall;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewhall")
public class ViewHallController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<Hall>> getAllHalls() throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<Hall> viewHalls = Hall.listAll();
        return new ResponseEntity<ArrayList<Hall>>(viewHalls, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public Hall getUserById(@PathVariable Integer id) throws SQLException {
        return Hall.get(id);
    }
    
}
