package com.adrian.controller;

import com.adrian.Services.ApartmentService;
import com.adrian.Services.ReservationService;
import com.adrian.Services.UserService;
import com.adrian.mapper.OwnerReservationViewWrapper;
import com.adrian.mapper.ReservationViewWrapper;
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
    @Autowired
    ReservationService reservationService;

    @GetMapping(value = "/reserve")
    public String tryReserve(@RequestParam String apartmentName, String startDate, String endDate, String userEmail) {

        int apartmentId = apartmentService.getNameToIdApartment().get(apartmentName);
        LocalDate startDateLD = LocalDate.parse(startDate);
        LocalDate endDateLD = LocalDate.parse(endDate);

        List<ReservationEntity> reservations = repositoryReservation.findAllReservationFromAGivenDateRangeAndApartmentId(startDateLD, endDateLD, apartmentId);
        if (reservations.size() > 0) {
            return new JSONObject()
                    .put("error", "This apartment is reserved during the specified time period")
                    .toString();

        } else {
            int userId = userService.getEmailToIdUser().get(userEmail);
            long numberOfDays = ChronoUnit.DAYS.between(startDateLD, endDateLD);
            float totalPrice = apartmentService.getTotalPrice(apartmentId, numberOfDays);
            repositoryReservation.save(new ReservationEntity(startDateLD, endDateLD, totalPrice, apartmentId, userId, "Waiting"));
        }

        return new JSONObject()
                .put("message", "Reservation request sent successfully")
                .toString();
    }

    @GetMapping(value = "/historic")
    public List<ReservationViewWrapper> getHistoricReservations(@RequestParam String userEmail) {
        List<ReservationViewWrapper> result = reservationService.constructReservationViewWrapper(userEmail, true);

        return result;
    }

    @GetMapping(value = "/current")
    public List<ReservationViewWrapper> getCurrentReservations(@RequestParam String userEmail) {
        List<ReservationViewWrapper> result = reservationService.constructReservationViewWrapper(userEmail, false);

        return result;
    }

    @GetMapping(value = "/cancel")
    public String tryCancel(@RequestParam String apartmentName, String startDate) {
        repositoryReservation.delete(reservationService.getReservationEntity(apartmentName, startDate));
        return new JSONObject()
                .put("message", "Reservation canceled successfully")
                .toString();
    }

    @GetMapping(value = "/updateStatus")
    public String updateStatus(@RequestParam String apartmentName, String startDate, boolean isApproved) {

        ReservationEntity reservation = reservationService.getReservationEntity(apartmentName, startDate);
        String message = "Reservation approved successfully";
        if (isApproved) {
            reservation.setStatus("Approved");
        } else {
            message = "Reservation disaproved successfully";
            reservation.setStatus("Rejected");
        }
        repositoryReservation.save(reservation);
        return new JSONObject()
                .put("message", message)
                .toString();
    }

    @GetMapping(value = "/historicOwner")
    public List<OwnerReservationViewWrapper> getHistoricReservationsOwner(@RequestParam String userEmail) {
        List<OwnerReservationViewWrapper> result = reservationService.constructOwnerReservationViewWrapper(userEmail, true);

        return result;
    }

    @GetMapping(value = "/currentOwner")
    public List<OwnerReservationViewWrapper> getCurrentReservationsOwner(@RequestParam String userEmail) {
        List<OwnerReservationViewWrapper> result = reservationService.constructOwnerReservationViewWrapper(userEmail, false);

        return result;
    }
}
