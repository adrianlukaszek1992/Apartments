package com.adrian.repo;
import com.adrian.model.ApartmentEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApartmentRepository extends CrudRepository<ApartmentEntity, Integer> {

    @Query("select a from ApartmentEntity a where a.idHotel = :idHotel")
    List<ApartmentEntity> findApartmentsByHotelId(@Param("idHotel") int idHotel);

    @Query("select a from ApartmentEntity a where a.name = :name")
    List<ApartmentEntity> getApartmentsByHotelName(@Param("name") String name);

    @Query("select a from ApartmentEntity a where a.idApartment = :idApartment")
    List<ApartmentEntity> findApartmentsByApartmentId(@Param("idApartment") Integer idApartment);

    @Query("select a from ApartmentEntity a where a.status in('Available')")
    List<ApartmentEntity> findAllAvailable();

    @Query("select a.name from ApartmentEntity a where a.idHotel = :idHotel")
    List<String> findApartmentNameByHotelId(@Param("idHotel") int idHotel);
    @Query("select a.name, a.idHotel from ApartmentEntity a")
    List<ApartmentEntity> findAllApartmentNamesAndHotelIds();
    @Query("select a from ApartmentEntity a")
    List<ApartmentEntity> findAllApartments();
}
