package com.adrian.controller;

import com.adrian.Services.CityService;
import com.adrian.mapper.UserEntityViewWrapper;
import com.adrian.model.UserEntity;
import com.adrian.repo.CityRepository;
import com.adrian.repo.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/authentication")
@RestController
public class AuthenticationController {

    @Autowired
    UserRepository repository;
    @Autowired
    CityRepository repositoryCity;
    @Autowired
    CityService cityService;

    @GetMapping(value = "/login")
    public String loginIn(@RequestParam String email, String password) {
        System.out.println(email);

        System.out.println(password);
        if (repository.findProfileByPasswordAndEmail(password, email).size() == 0) {
            return new JSONObject()
                    .put("error", "wrong user name or password")
                    .toString();
        }
        return new JSONObject()
                .put("profile", repository.findProfileByPasswordAndEmail(password, email).get(0))
                .toString();
    }

    @PostMapping(value = "/create")
    public String postUser(@RequestBody UserEntity user) {
        if (repository.findUserByEmail(user.getEmail()).size() != 0) {
            return new JSONObject()
                    .put("error", "Email already exists in the system")
                    .toString();
        }
        String cityName = user.getCity().getCityName();
        int cityId = repositoryCity.findCityIdByCityName(cityName).get(0);

        UserEntity _user = repository.save(new UserEntity(user.getName(), user.getLastname(),
                user.getEmail(), user.getPassword(), user.getPhone(), user.getStreet(), user.getProfile(), cityId, 1));


        return new JSONObject()
                .put("profile", _user.getProfile())
                .toString();
    }

    @PostMapping(value = "/update")
    public String updateUser(@RequestBody UserEntity user) {

        UserEntity _user = repository.findUserByEmail(user.getEmail()).get(0);
        String cityName = user.getCity().getCityName();
        int cityId = repositoryCity.findCityIdByCityName(cityName).get(0);
        _user.setIdCity(cityId);
        _user.setLastname(user.getLastname());
        _user.setName(user.getName());
        _user.setPassword(user.getPassword());
        _user.setStreet(user.getStreet());
        _user.setPhone(user.getPhone());
        _user.setProfile(user.getProfile());
        repository.save(_user);
        return new JSONObject()
                .put("message", "Data was saved successfully")
                .toString();
    }

    @GetMapping(value = "/getUsers")
    public List<UserEntityViewWrapper> getUsers() {
        List<UserEntity> users=repository.findAllUsers();
        List<UserEntityViewWrapper> result = new ArrayList<>();
        users.forEach(user ->{
            String city = cityService.getIdToNameCity().get(user.getIdCity());
            result.add(new UserEntityViewWrapper(user.getName(), user.getLastname(), user.getEmail(), user.getPassword(), user.getPhone(), user.getStreet(), user.getProfile(), city, user.getEnabled()));
        });
        return result;
    }

    @GetMapping(value = "/delete")
    public String deleteUser(@RequestParam String email) {
        List<UserEntity> users=repository.findUserByEmail(email);
        UserEntity user = users.get(0);
        repository.delete(user);
        return new JSONObject()
                .put("message", "User was deleted successfully")
                .toString();
    }
}
