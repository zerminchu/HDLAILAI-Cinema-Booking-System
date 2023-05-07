package com.csit314.backend.CustomerInfo;

import java.sql.SQLException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/createcustomerinfo")
public class CreateCustomerInfoController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<?> addNewCust(@RequestBody CustomerInfo custInfo)
            throws SQLException {

        // UserAccount newUser = objectMapper.convertValue(json.get("userAccount"),
        // userAccount.class);
        // CustomerInfo custInfo = objectMapper.convertValue(json.get("custInfo"),
        // customerInfo.class);
        // UserAccount.save(user);
        // CustomerInfo.save(custInfo);
        CustomerInfo ci = new CustomerInfo();
        ci.save(custInfo);

        return ResponseEntity.ok("Account has been created successfully");
    }
}