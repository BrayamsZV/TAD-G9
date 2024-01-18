package com.apiG9.crudG9.repositories;

import com.apiG9.crudG9.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, Long>{
}

