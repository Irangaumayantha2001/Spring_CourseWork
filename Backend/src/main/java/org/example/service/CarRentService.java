package org.example.service;

import org.example.dto.CarRentDTO;

import java.util.List;

public interface CarRentService {
    void addCarRent(CarRentDTO dto);

    void updateCarRent(CarRentDTO dto);

    void deleteCarRent(String rentId);

    CarRentDTO searchCarRent(String rentId);

    List<CarRentDTO> getAllCarRents();

    String generateRentId();

    void updateCarRentStatus(String rentId, String status);

    List<CarRentDTO> getCarRentsByStatus(String status);

    List<CarRentDTO> getCarRentsByDrivingLicenceNo(String status, String licenceNo);
}


