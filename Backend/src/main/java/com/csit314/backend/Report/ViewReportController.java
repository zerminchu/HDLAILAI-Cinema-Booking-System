package com.csit314.backend.Report;

import java.sql.Date;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/viewreport")
public class ViewReportController {
    @GetMapping(path = "/allhour/{startTime}/{endTime}/{type}")
    public ResponseEntity<ArrayList<Report>> getAllHourlyReport(@PathVariable Timestamp startTime,
            @PathVariable Timestamp endTime,
            @PathVariable String type) throws SQLException {
        // This returns a JSON or XML with the users
        Report r = new Report();
        ArrayList<Report> cinemaOwner = r.listAllByHour(startTime, endTime, type);
        return new ResponseEntity<ArrayList<Report>>(cinemaOwner,
                HttpStatus.OK);
    }

    @GetMapping(path = "/alldaily/{day}/{type}")
    public ResponseEntity<ArrayList<Report>> getAllDailyReport(@PathVariable Date day,
            @PathVariable String type) throws SQLException {
        // This returns a JSON or XML with the users
        Report r = new Report();
        ArrayList<Report> cinemaOwner = r.listAllByDay(day, type);
        return new ResponseEntity<ArrayList<Report>>(cinemaOwner,
                HttpStatus.OK);
    }

    @GetMapping(path = "/allweekly/{week}/{type}")
    public ResponseEntity<ArrayList<Report>> getAllDailyReport(@PathVariable String week, @PathVariable String type)
            throws SQLException {
        // This returns a JSON or XML with the users
        Report r = new Report();
        ArrayList<Report> cinemaOwner = r.listAllByWeek(week, type);
        return new ResponseEntity<ArrayList<Report>>(cinemaOwner,
                HttpStatus.OK);
    }

}