package com.csit314.backend.CinemaOwner;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
// import com.csit314.backend.CinemaOwner.CinemaOwner;
// import com.csit314.backend.Transaction.Transaction;

// @Controller
// @RequestMapping(path = "/viewhourlyticketsale")
// public class ViewHourlyTicketSale {

//     @GetMapping(path = "/all")
//     public ResponseEntity<ArrayList<CinemaOwner>> getAllHourlyTicketSales() throws SQLException {
//         CinemaOwner ticketSale = new CinemaOwner();
//         ArrayList<CinemaOwner> Cinemaowner = ticketSale.listAll();
//         return new ResponseEntity<ArrayList<CinemaOwner>>(Cinemaowner, HttpStatus.OK);
//     }
// }
