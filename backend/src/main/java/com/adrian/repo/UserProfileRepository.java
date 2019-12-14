package com.adrian.repo;

import com.adrian.model.UserProfileEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProfileRepository extends CrudRepository<UserProfileEntity,Integer>{

    @Query("select u.profileName from UserProfileEntity u where u.password = :password and u.email= :email")
    List<String> findProfileNameByPasswordAndEmail(@Param("password") String password, @Param("email") String email);
}
