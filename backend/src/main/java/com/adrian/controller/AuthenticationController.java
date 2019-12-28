package com.adrian.controller;

import com.adrian.model.UserEntity;
import com.adrian.repo.CityRepository;
import com.adrian.repo.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/authentication")
@RestController
public class AuthenticationController {

    @Autowired
    UserRepository repository;
    @Autowired
    CityRepository repositoryCity;

    @GetMapping(value = "/login")
    public String loginIn(@RequestParam String email, String password){
    System.out.println(email);
        System.out.println(password);
        if(repository.findProfileByPasswordAndEmail(password, email).size() == 0){
            return new JSONObject()
                    .put("error", "wrong user name or password")
                    .toString();
        }
        return new JSONObject()
                .put("profile", repository.findProfileByPasswordAndEmail(password, email).get(0))
                .toString();
    }
    @PostMapping(value = "/create")
    public UserEntity postUser(@RequestBody UserEntity user) {

        String cityName = user.getCity().getCityName();
        int cityId = repositoryCity.findCityIdByCityName(cityName).get(0);
        System.out.println(cityId);
        UserEntity _user = repository.save(new UserEntity(user.getName(), user.getLastname(),
                user.getEmail(), user.getPassword(), user.getPhone(), user.getStreet(), user.getProfile(),  cityId, 1));

            return _user;

    }
}
