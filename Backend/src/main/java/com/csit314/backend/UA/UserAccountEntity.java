package com.csit314.backend.UA;

import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.csit314.backend.UA.UserAccount;

@Service
@Transactional
public class UserAccountEntity {

    @Autowired
    private UserAccountRepository repo;

    // Create
    public void save(UserAccount product) {
        repo.save(product);
    }

    // Read all
    public Iterable<UserAccount> listAll() {
        return repo.findAll();
    }

    // Read One
    public UserAccount get(Integer id) {
        return repo.findById(id).get();
    }

    // Update
    public Boolean update(UserAccount userAccount, Integer id) {
        try {
            UserAccount existUser = this.get(id);
            repo.save(userAccount);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Suspend
    public Boolean suspend(Integer id) {
        try {
            UserAccount existUser = this.get(id);
            existUser.setSuspended(true);
            repo.save(existUser);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Unsuspend
    public Boolean unsuspend(Integer id) {
        try {
            UserAccount existUser = this.get(id);
            existUser.setSuspended(false);
            repo.save(existUser);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
