package com.adrian.controller;

import com.adrian.Services.ApartmentService;
import com.adrian.Services.UserService;
import com.adrian.model.ReservationEntity;
import com.adrian.repo.ReservationRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/reservation")
@RestController
public class ReservationController {

    @Autowired
    ReservationRepository repositoryReservation;
    @Autowired
    ApartmentService apartmentService;
    @Autowired
    UserService userService;

    @GetMapping(value = "/reserve")
    public String tryReserve(@RequestParam String apartmentName, String startDate, String endDate, String userEmail) {

        int apartmentId = apartmentService.getNameToIdApartment().get(apartmentName);
        LocalDate startDateLD = LocalDate.parse(startDate);
        LocalDate endDateLD = LocalDate.parse(endDate);

        List<ReservationEntity> reservations = repositoryReservation.findAllIdApartmentFromAGivenDateRangeAndApartmentId(startDateLD, endDateLD, apartmentId);
        if(reservations.size()>0){
            return new JSONObject()
                    .put("error", "This apartment is reserved during the specified time period")
                    .toString();

        }else{
            int userId = userService.getEmailToIdUser().get(userEmail);
            long numberOfDays = ChronoUnit.DAYS.between(startDateLD, endDateLD);
            float totalPrice= apartmentService.getTotalPrice(apartmentId, numberOfDays);
            repositoryReservation.save(new ReservationEntity(startDateLD, endDateLD, totalPrice, apartmentId, userId, "Approved"));
        }

        return new JSONObject()
                .put("massage", "Apartment reserved successfully")
                .toString();
    }
}
