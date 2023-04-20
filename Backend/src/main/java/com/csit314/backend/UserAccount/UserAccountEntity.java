package com.csit314.backend.UserAccount;

import org.springframework.transaction.annotation.Transactional;

import com.csit314.backend.UserAccount.UserAccount;

import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public ArrayList<UserAccount> listAll() {
        return repo.findAll();
    }

    // Read One
    public UserAccount get(Integer id) throws NoSuchElementException {
        return repo.findById(id).get();
    }

    // Update
    public Boolean update(UserAccount userAccount, Integer id) {
        try {
            UserAccount existUser = this.get(id);
            existUser.setName(userAccount.getName());
            existUser.setPassword(userAccount.getPassword());
            existUser.setEmail(userAccount.getEmail());
            existUser.setUserProfile(userAccount.getUserProfile());
            repo.save(existUser);
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
