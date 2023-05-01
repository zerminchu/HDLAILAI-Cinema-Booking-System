package com.csit314.backend.Fnb;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewfnb")
public class ViewFnbController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<Fnb>> getAllHalls() throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<Fnb> viewHalls = Fnb.listAll();
        return new ResponseEntity<ArrayList<Fnb>>(viewHalls, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Fnb> getHallById(@PathVariable Integer id) throws SQLException {
        Fnb result = Fnb.get(id);
        return new ResponseEntity<Fnb>(result, HttpStatus.OK);
    }
    
}
