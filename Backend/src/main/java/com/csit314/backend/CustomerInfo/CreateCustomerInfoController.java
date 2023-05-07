package com.csit314.backend.CustomerInfo;

import java.sql.SQLException;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.csit314.backend.UserAccount.UserAccount;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;


import jakarta.servlet.http.HttpSession;

@Controller 
@RequestMapping(path = "/createcustomerinfo") 
public class CreateCustomerInfoController { 
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<?> addNewCust(@RequestBody CustomerInfo user)
            throws SQLException {
        if (user.getDob() == null || user.getDob().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("DOB cannot be empty");
        }
        if (user.getAddress() == null || user.getAddress().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Address cannot be empty");
        }
        if (user.getGender() == null || user.getGender().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gender cannot be empty");
        }

        //Check for leading or trailing white spaces
        if (!user.getDob().equals(user.getDob().trim())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No leading/trailing whitespaces");
        }
        
        if (!user.getAddress().equals(user.getAddress().trim())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No leading/trailing whitespaces");
        }

        if (!user.getGender().equals(user.getGender().trim())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No leading/trailing whitespaces");
        }
        

        // UserAccount newUser = objectMapper.convertValue(json.get("userAccount"), userAccount.class);
        // CustomerInfo custInfo = objectMapper.convertValue(json.get("custInfo"), customerInfo.class);
        // UserAccount.save(user);
        // CustomerInfo.save(custInfo);

        CustomerInfo.save(user);

        return ResponseEntity.ok("Account has been created successfully");
    }
}