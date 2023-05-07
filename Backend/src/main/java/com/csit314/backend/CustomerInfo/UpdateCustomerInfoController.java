package com.csit314.backend.CustomerInfo;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/updatecustomerinfo")
public class UpdateCustomerInfoController {

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody CustomerInfo customerInfo, @PathVariable Integer accountId)
            throws SQLException {
        CustomerInfo ci = new CustomerInfo();
        if (ci.update(customerInfo)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
