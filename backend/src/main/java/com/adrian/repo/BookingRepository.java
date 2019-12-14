package com.adrian.repo;

import org.springframework.data.repository.CrudRepository;

import com.adrian.model.BookingModel;

import java.util.List;

public interface BookingRepository extends CrudRepository<BookingModel, Long>{

    List<BookingModel> findByStartDateGreaterThanEqualAndEndDateIsLessThanEqualAndFlatNameEquals (String startDate, String endDate, String flatName);
}
