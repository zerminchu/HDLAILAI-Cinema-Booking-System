package com.csit314.backend.UserAccount;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createuseraccount") // This means URL's start with /useraccount (after Application path)
public class CreateUserAccountController {
    @Autowired
    private UserAccountEntity UAEntity;

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser(@RequestBody UserAccount user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestBody means it is the message sent in the GET or POST request
        UAEntity.save(user);
        return "Saved";
    }
}