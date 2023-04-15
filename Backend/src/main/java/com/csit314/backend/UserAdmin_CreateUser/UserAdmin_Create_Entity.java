package com.csit314.backend.UserAdmin_CreateUser;

import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.csit314.backend.UserAdmin_CreateUser.UserAdmin_Create;

@Service
@Transactional
public class UserAdmin_Create_Entity {

    @Autowired
    private UserAdmin_Create_Repository repo;

    // Create
    public void save(UserAdmin_Create product) {
        repo.save(product);
    }

    // Read all
    public Iterable<UserAdmin_Create> listAll() {
        return repo.findAll();
    }

    // Read One
    public UserAdmin_Create get(Integer id) throws NoSuchElementException {
        return repo.findById(id).get();
    }

    // Update
    public Boolean update(UserAdmin_Create userAccount, Integer id) {
        try {
            UserAdmin_Create existUser = this.get(id);
            repo.save(userAccount);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Suspend
    public Boolean suspend(Integer id) {
        try {
            UserAdmin_Create existUser = this.get(id);
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
            UserAdmin_Create existUser = this.get(id);
            existUser.setSuspended(false);
            repo.save(existUser);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
