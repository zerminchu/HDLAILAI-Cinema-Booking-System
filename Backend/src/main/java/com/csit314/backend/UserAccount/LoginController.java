package com.csit314.backend.UA;

import java.util.Map;
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
@RequestMapping(path = "/login") // This means URL's start with /useraccount (after Application path)
public class LoginController {
    @PostMapping(path = "/loginUA") // Map ONLY POST Requests
    public @ResponseBody String login(@RequestBody Map<String, String, String> loginInfo) {
        System.out.println(loginInfo.get("role"));
        System.out.println(loginInfo.get("email"));
        System.out.println(loginInfo.get("password"));
        return "hello";
    }
}
