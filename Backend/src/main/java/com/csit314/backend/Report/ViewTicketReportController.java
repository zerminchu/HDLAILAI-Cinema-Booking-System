package com.csit314.backend.Report;

import java.util.Date;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/viewreport/ticket")
public class ViewTicketReportController {
    @GetMapping(path = "/hourly")
    public ResponseEntity<ArrayList<Report>> getHourlyTicketReport(
            @RequestParam(name = "startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDateTime,
            @RequestParam(name = "endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDateTime)
            throws SQLException {
        // This returns a JSON or XML with the users
        Timestamp startTimestamp = new Timestamp(startDateTime.getTime());
        Timestamp endTimestamp = new Timestamp(endDateTime.getTime());
        Report r = new Report();
        ArrayList<Report> cinemaOwner = r.listAllTicketByHour(startTimestamp, endTimestamp);
        return new ResponseEntity<ArrayList<Report>>(cinemaOwner,
                HttpStatus.OK);
    }

    @GetMapping(path = "/daily")
    public ResponseEntity<ArrayList<Report>> getDailyTicketReport(
            @RequestParam(name = "startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDateTime,
            @RequestParam(name = "endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDateTime)
            throws SQLException {
        // This returns a JSON or XML with the users
        Timestamp startTimestamp = new Timestamp(startDateTime.getTime());
        Timestamp endTimestamp = new Timestamp(endDateTime.getTime());
        Report r = new Report();
        ArrayList<Report> cinemaOwner = r.listAllTicketByDay(startTimestamp, endTimestamp);
        return new ResponseEntity<ArrayList<Report>>(cinemaOwner,
                HttpStatus.OK);
    }

    @GetMapping(path = "/weekly")
    public ResponseEntity<ArrayList<Report>> getWeeklyTicketReport(
            @RequestParam(name = "startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDateTime,
            @RequestParam(name = "endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDateTime)
            throws SQLException {
        // This returns a JSON or XML with the users
        Timestamp startTimestamp = new Timestamp(startDateTime.getTime());
        Timestamp endTimestamp = new Timestamp(endDateTime.getTime());
        Report r = new Report();
        ArrayList<Report> cinemaOwner = r.listAllTicketByWeek(startTimestamp, endTimestamp);
        return new ResponseEntity<ArrayList<Report>>(cinemaOwner,
                HttpStatus.OK);
    }

}