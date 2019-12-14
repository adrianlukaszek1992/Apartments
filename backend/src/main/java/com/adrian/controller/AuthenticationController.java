package com.adrian.controller;

import com.adrian.repo.UserProfileRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/authentication")
@RestController
public class AuthenticationController {

    @Autowired
    UserProfileRepository repository;

    @PostMapping(value = "/login")
    public String loginIn(@RequestBody String email, String password){

        if(repository.findProfileNameByPasswordAndEmail(email, password).size() == 0){
            return new JSONObject()
                    .put("error", "wrong user name or password")
                    .toString();
        }
        return new JSONObject()
                .put("profile", repository.findProfileNameByPasswordAndEmail(email, password).get(0))
                .toString();
    }
}
