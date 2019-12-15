package com.adrian.controller;


import com.adrian.repo.FlatRepository;
import com.adrian.model.FlatModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/flat")

public class FlatController {

    @Autowired
    FlatRepository repository;

    @GetMapping("/list")
    public List<FlatModel> getAllFlats() {
        System.out.println("Get all FlatModel...");

        List<FlatModel> flat = new ArrayList<>();
        repository.findAll().forEach(flat::add);

        return flat;
    }
}
