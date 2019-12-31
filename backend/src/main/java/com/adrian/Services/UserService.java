package com.adrian.Services;

import com.adrian.model.CityEntity;
import com.adrian.model.UserEntity;
import com.adrian.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Configurable
public class UserService {

    @Autowired
    UserRepository repositoryUser;

    public Map<Integer, String> getIdToEmailUser(){
        Map<Integer, String> userMap = new HashMap<>();

        List<UserEntity> users = new ArrayList<>();
        repositoryUser.findAll().forEach(users::add);
        for(UserEntity user : users){
            userMap.put(user.getIdUser(), user.getEmail());
        }
        return userMap;
    }
    public Map<String, Integer> getEmailToIdUser(){
        Map<String, Integer> userMap = new HashMap<>();

        List<UserEntity> users = new ArrayList<>();
        repositoryUser.findAll().forEach(users::add);
        for(UserEntity user : users){
            userMap.put(user.getEmail(), user.getIdUser());
        }
        return userMap;
    }
}
