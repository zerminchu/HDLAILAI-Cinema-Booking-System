package com.csit314.backend.Report;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createreport")
public class CreateReportController {
    @PostMapping(path = "/addhour") // Map ONLY POST Requests
    public ResponseEntity<String> addHourlyReport() throws SQLException {
        try {
            Report r = new Report();
            String result = r.saveHourlyReport();
            if (result != "Success")
                return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<String>("saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/adddaily") // Map ONLY POST Requests
    public ResponseEntity<String> addDailyReport() throws SQLException {
        try {
            Report r = new Report();
            String result = r.saveDailyReport();
            if (result != "Success")
                return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<String>("saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/addweekly") // Map ONLY POST Requests
    public ResponseEntity<String> addWeeklyReport() throws SQLException {
        try {
            Report r = new Report();
            String result = r.saveWeeklyReport();
            if (result != "Success")
                return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<String>("saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}