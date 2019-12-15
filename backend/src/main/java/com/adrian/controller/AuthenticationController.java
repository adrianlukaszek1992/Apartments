package com.adrian.controller;

import com.adrian.repo.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/authentication")
@RestController
public class AuthenticationController {

    @Autowired
    UserRepository repository;

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
}
