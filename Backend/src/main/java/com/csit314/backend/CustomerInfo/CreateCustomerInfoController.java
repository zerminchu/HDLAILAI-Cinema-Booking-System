package com.csit314.backend.CustomerInfo;

import java.sql.SQLException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.HttpStatus;

@Controller
@RequestMapping(path = "/createcustomerinfo")
public class CreateCustomerInfoController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<?> addNewCust(@RequestBody CustomerInfo custInfo)
            throws SQLException {
        try {
            CustomerInfo ci = new CustomerInfo();
            ci.save(custInfo);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}