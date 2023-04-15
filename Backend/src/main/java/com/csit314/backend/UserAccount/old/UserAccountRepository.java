package com.csit314.backend.UserAccount.old;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
// <ClassType, IdType> Refers to what kind of id will be used in the database
// Change name of repository and ClassType
public interface UserAccountRepository extends CrudRepository<UserAccount, Integer> {

}