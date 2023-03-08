package org.example.service.impl;

import org.example.dto.CarRentDTO;
import org.example.entity.Car;
import org.example.entity.CarRent;
import org.example.entity.Customer;
import org.example.entity.Driver;
import org.example.repo.CarRentRepo;
import org.example.service.CarRentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class CarRentServiceImpl implements CarRentService {

    @Autowired
    CarRentRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void addCarRent(CarRentDTO dto) {
        if (!repo.existsById(dto.getRentId())) {
            repo.save(new CarRent(dto.getRentId(),dto.getDate(),dto.getPickUpDate(),dto.getReturnDate(),dto.getStatus(),new Customer(dto.getCustomer().getCustomerId()),new Car(dto.getCar().getRegistrationNO()),new Driver(dto.getDriver().getLicenceNo())));
        } else {
            throw new RuntimeException("Booking Already Exists...");
        }
    }

    @Override
    public void updateCarRent(CarRentDTO dto) {
        if (repo.existsById(dto.getRentId())) {
            repo.save(mapper.map(dto, CarRent.class));
        } else {
            throw new RuntimeException("No Such CarRents To Update");
        }
    }

    @Override
    public void deleteCarRent(String rentId) {
        if (repo.existsById(rentId)) {
            repo.deleteById(rentId);
        } else {
            throw new RuntimeException("No Such CarRents To Delete");
        }
    }

    @Override
    public CarRentDTO searchCarRent(String rentId) {
        if (repo.existsById(rentId)) {
            return mapper.map(repo.findById(rentId).get(), CarRentDTO.class);
        } else {
            throw new RuntimeException("Car Rent Not Found...");
        }
    }

    @Override
    public List<CarRentDTO> getAllCarRents() {
        return mapper.map(repo.findAll(), new TypeToken<List<CarRentDTO>>() {
        }.getType());
    }

    @Override
    public String generateRentId() {
        String lastId = repo.generateRentId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "RT0-000" + tempId;
            } else if (tempId <= 99) {
                id = "RT0-00" + tempId;
            } else if (tempId <= 999) {
                id = "RT0-0" + tempId;
            } else if (tempId <= 9999) {
                id = "RT0-" + tempId;
            }
        } else {
            id = "RT0-0001";
        }
        return id;
    }

    @Override
    public void updateCarRentStatus(String rentId, String status) {
        if (repo.existsById(rentId)) {
            repo.updateCarRentStatus(rentId, status);
        } else {
            throw new RuntimeException("No Such CarRent To Update");
        }
    }

    @Override
    public List<CarRentDTO> getCarRentsByStatus(String status) {
        return mapper.map(repo.getAllByStatus(status), new TypeToken<List<CarRentDTO>>() {
        }.getType());
    }

    @Override
    public List<CarRentDTO> getCarRentsByDrivingLicenceNo(String status, String licenceNo) {
        return mapper.map(repo.getAllByDrivingLicenceNo(status, licenceNo), new TypeToken<List<CarRentDTO>>() {
        }.getType());
    }
}
