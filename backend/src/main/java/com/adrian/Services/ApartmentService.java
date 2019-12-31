package com.adrian.Services;

import com.adrian.model.ApartmentEntity;
import com.adrian.repo.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Configurable
public class ApartmentService {
    @Autowired
    ApartmentRepository repositoryApartment;

    public Map<Integer, String> getIdToNameApartment() {
        Map<Integer, String> apartmentMap = new HashMap<>();

        List<ApartmentEntity> apartments = new ArrayList<>();
        repositoryApartment.findAll().forEach(apartments::add);
        for (ApartmentEntity apartment : apartments) {
            apartmentMap.put(apartment.getIdApartment(), apartment.getName());
        }
        return apartmentMap;
    }

    public Map<String, Integer> getNameToIdApartment() {
        Map<String, Integer> apartmentMap = new HashMap<>();

        List<ApartmentEntity> apartments = new ArrayList<>();
        repositoryApartment.findAll().forEach(apartments::add);
        for (ApartmentEntity apartment : apartments) {
            apartmentMap.put(apartment.getName(), apartment.getIdApartment());
        }
        return apartmentMap;
    }

    public float getTotalPrice(int apartmentId, long numberOfDays) {
        List<Float> apartmentPrices = repositoryApartment.findPriceByIdApartment(apartmentId);
        float price = apartmentPrices.get(0);
        float totalPrice = price*numberOfDays;
        return totalPrice;
    }
}
