package com.adrian.Services;

import com.adrian.mapper.OwnerReservationViewWrapper;
import com.adrian.mapper.ReservationViewWrapper;
import com.adrian.model.ApartmentEntity;
import com.adrian.model.HotelEntity;
import com.adrian.model.ReservationEntity;
import com.adrian.model.UserEntity;
import com.adrian.repo.ApartmentRepository;
import com.adrian.repo.HotelRepository;
import com.adrian.repo.ReservationRepository;
import com.adrian.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Configurable
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ApartmentRepository apartmentRepository;
    @Autowired
    HotelRepository hotelRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @Autowired
    CityService cityService;
    @Autowired
    ApartmentService apartmentService;

    public List<ReservationViewWrapper> constructReservationViewWrapper(String userEmail, boolean isHistoric) {
        List<ReservationViewWrapper> result = new ArrayList<>();

        LocalDate now = LocalDate.now();
        int userId = userService.getEmailToIdUser().get(userEmail);
        List<ReservationEntity> reservations = isHistoric
                ? reservationRepository.findAllReservationByUserAndStartDateLessThan(userId, now)
                : reservationRepository.findAllReservationByUserAndStartDateMoreThan(userId, now);
        List<Integer> idApartments = new ArrayList<>();
        if (reservations.size() == 0) {
            return result;
        }
        reservations.forEach(reservation -> idApartments.add(reservation.getIdApartment()));

        List<ApartmentEntity> apartments = apartmentRepository.findApartmentsByIdApartments(idApartments);

        List<Integer> idHotels = new ArrayList<>();
        apartments.forEach(apartment -> idHotels.add(apartment.getIdHotel()));
        List<HotelEntity> hotels = hotelRepository.findHotelByHotelIds(idHotels);

        for (ReservationEntity reservation : reservations) {
            for (ApartmentEntity apartment : apartments) {
                for (HotelEntity hotel : hotels) {
                    if (reservation.getIdApartment() == apartment.getIdApartment() && apartment.getIdHotel() == hotel.getIdHotel()) {
                        String cityName = cityService.getIdToNameCity().get(hotel.getIdCity());
                        result.add(new ReservationViewWrapper(reservation.getPrice(), reservation.getStatus(), reservation.getEndDate(),
                                reservation.getStartDate(), hotel.getName(), cityName, hotel.getStreet(), apartment.getName()));
                    }
                }
            }
        }

        return result;
    }

    public List<OwnerReservationViewWrapper> constructOwnerReservationViewWrapper(String userEmail, boolean isHistoric) {
        List<OwnerReservationViewWrapper> result = new ArrayList<>();

        int userId = userService.getEmailToIdUser().get(userEmail);
        List<HotelEntity> hotelsOwner = hotelRepository.findListOfHotelsByOwnerId(userId);
        List<Integer> hotelIds = new ArrayList<>();
        hotelsOwner.forEach(hotel -> hotelIds.add(hotel.getIdHotel()));

        List<ApartmentEntity> apartmentsOwner = apartmentRepository.findApartmentsByIdHotels(hotelIds);
        List<Integer> apartmentsIds = new ArrayList<>();
        apartmentsOwner.forEach(apartment -> apartmentsIds.add(apartment.getIdApartment()));

        List<ReservationEntity> reservations = isHistoric
                ? reservationRepository.findAllReservationByApartmetIdsAndStatusNot(apartmentsIds, "Waiting")
                : reservationRepository.findAllReservationByApartmetIdsAndStatus(apartmentsIds, "Waiting");
        List<Integer> idApartments = new ArrayList<>();
        List<Integer> idUsers = new ArrayList<>();
        if (reservations.size() == 0) {
            return result;
        }
        reservations.forEach(reservation -> {
            idApartments.add(reservation.getIdApartment());
            idUsers.add(reservation.getIdUser());
        });


        List<ApartmentEntity> apartments = apartmentRepository.findApartmentsByIdApartments(idApartments);
        List<UserEntity> users = userRepository.findUserByIds(idUsers);
        List<Integer> idHotels = new ArrayList<>();
        apartments.forEach(apartment -> idHotels.add(apartment.getIdHotel()));
        List<HotelEntity> hotels = hotelRepository.findHotelByHotelIds(idHotels);

        for (ReservationEntity reservation : reservations) {
            for (UserEntity user : users) {
                for (ApartmentEntity apartment : apartments) {
                    for (HotelEntity hotel : hotels) {
                        if (reservation.getIdApartment() == apartment.getIdApartment() && apartment.getIdHotel() == hotel.getIdHotel() &&
                                reservation.getIdUser() == user.getIdUser()) {
                            String cityName = cityService.getIdToNameCity().get(hotel.getIdCity());
                            result.add(new OwnerReservationViewWrapper(hotel.getName(), apartment.getName(), hotel.getStreet(), cityName, user.getName(),
                                    user.getLastname(), reservation.getStartDate(), reservation.getEndDate(), reservation.getPrice(), user.getEmail(), reservation.getStatus()));
                        }
                    }
                }
            }
        }
        return result;
    }

    public ReservationEntity getReservationEntity(String apartmentName, String startDate){
        int idApartment = apartmentService.getNameToIdApartment().get(apartmentName);
        LocalDate startDateLD = LocalDate.parse(startDate);
        List<ReservationEntity> entities = reservationRepository.findByIdApartmentAndStartDate(idApartment, startDateLD);
        return entities.get(0);
    }
}
