package com.csit314.backend.TicketType;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewtickettype")
public class ViewTicketTypeController {
    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllTicketTypes() throws SQLException {
        TicketType tt = new TicketType();
        ArrayList<TicketType> ticketTypes = tt.listAll();
        return new ResponseEntity<ArrayList<TicketType>>(ticketTypes, HttpStatus.OK);

    }
}
