package com.csit314.backend.Fnb;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(path = "/searchfnb")
public class SearchFnbController {
    @GetMapping
    public ResponseEntity<ArrayList<Fnb>> getAllFnb(@RequestParam("q") String query)
            throws SQLException {
        Fnb f = new Fnb();
        ArrayList<Fnb> searchResults = f.search(query);
        return new ResponseEntity<ArrayList<Fnb>>(searchResults, HttpStatus.OK);
    }
}
