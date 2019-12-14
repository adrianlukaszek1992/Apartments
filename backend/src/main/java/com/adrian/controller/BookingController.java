package com.adrian.controller;

import com.adrian.model.BookingModel;
import com.adrian.repo.BookingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    BookingRepository repository;

    @GetMapping("/validation")
    public boolean validation(@RequestParam String startDate, String endDate, String flatName) {

        System.out.println("Doing validation...");
        List<BookingModel> booking = repository.findByStartDateGreaterThanEqualAndEndDateIsLessThanEqualAndFlatNameEquals(startDate, endDate, flatName);
        boolean validation;

        if (booking.size() == 0) {
            validation = true;
        } else {
            validation = false;
        }
        return validation;
    }

    @PostMapping(value = "/create")
    public BookingModel postBooking(@RequestBody BookingModel booking) {
        if (validation(booking.getStartDate(), booking.getEndDate(), booking.getFlatName()) == true) {
            BookingModel _booking = repository.save(new BookingModel(booking.getName(), booking.getLastname(),
                    booking.getEmail(), booking.getStartDate(), booking.getEndDate(), booking.getFlatName()));
            System.out.println(booking.getName());
            return _booking;

        } else {
            return null;
        }
    }
}
