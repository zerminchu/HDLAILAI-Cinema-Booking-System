package com.csit314.backend.TicketType;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

//NEED TO CHECK WITh KYLE

@Controller
@RequestMapping(path = "/searchtickettype")
public class SearchTicketTypeController {
    @GetMapping
    public ResponseEntity<ArrayList<TicketType>> getAllTicketType(@RequestParam("q") String query)
            throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<TicketType> searchResults = TicketType.search(query);
        return new ResponseEntity<ArrayList<TicketType>>(searchResults, HttpStatus.OK);
    }
}
