package com.csit314.backend.TicketType;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.SQLException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/viewtickettype")
public class ViewTicketTypeController {
    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllTicketTypes() throws SQLException {

        ArrayList<TicketType> ticketTypes = TicketType.listAll();
        return new ResponseEntity<ArrayList<TicketType>>(ticketTypes, HttpStatus.OK);
    
    }
}

