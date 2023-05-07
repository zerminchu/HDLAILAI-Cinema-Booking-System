package com.csit314.backend.CustomerInfo;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewcustomerinfo")
public class ViewCustomerInfoController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<CustomerInfo>> getAllUsers() throws SQLException {
        // This returns a JSON or XML with the users
        CustomerInfo ci = new CustomerInfo();
        ArrayList<CustomerInfo> customerInfo = ci.listAll();
        return new ResponseEntity<ArrayList<CustomerInfo>>(customerInfo, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public CustomerInfo getUserById(@PathVariable Integer accountId) throws SQLException {
        CustomerInfo ci = new CustomerInfo();
        return ci.get(accountId);
    }

}
