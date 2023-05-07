package com.csit314.backend.TransactionItem;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createTransactionItemFnb")
public class CreateFnbTransactionItemController {
    @PostMapping(path = "/addFnb") // Map ONLY POST Requests
    public ResponseEntity<String> addNewTransactionItemFnb(@RequestBody TransactionItem transactionItem) throws SQLException {
        try {
            String result = TransactionItem.savefnb(transactionItem);
            if (result != "Success")
                return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<String>("saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}