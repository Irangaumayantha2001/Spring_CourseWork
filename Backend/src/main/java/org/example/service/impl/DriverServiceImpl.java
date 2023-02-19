package org.example.service.impl;


import org.example.dto.DriverDTO;
import org.example.entity.Driver;
import org.example.repo.DriverRepo;
import org.example.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {
    @Autowired
    DriverRepo repo;

    @Autowired
    ModelMapper mapper;


    @Override
    public void saveDriver(DriverDTO dto) {
        if (!repo.existsById(dto.getLicenceNo())){
            repo.save(mapper.map(dto, Driver.class));
        }else {
            throw new RuntimeException("Driver Already Exists");
        }
    }

    @Override
    public void updateDriver(DriverDTO dto) {
        if (repo.existsById(dto.getLicenceNo())){
            repo.save(mapper.map(dto, Driver.class));
        }else {
            throw new RuntimeException("No Such Driver To Update");
        }
    }

    @Override
    public void deleteDriver(String licenceNo) {
        if (repo.existsById(licenceNo)){
            repo.deleteById(licenceNo);
        }else {
            throw new RuntimeException("No Such Driver To Delete");
        }
    }

    @Override
    public DriverDTO searchDriver(String licenceNo) {
        if (repo.existsById(licenceNo)){
            return mapper.map(repo.findById(licenceNo).get(), DriverDTO.class);
        }else {
            throw new RuntimeException("Driver Not Found...");
        }
    }

    @Override
    public List<DriverDTO> getAllDrivers() {
        return mapper.map(repo.findAll(), new TypeToken<List<DriverDTO>>() {
        }.getType());
    }

    @Override
    public boolean findDriverByUsername(String username) {
       return repo.findDriverByUsername(username).isPresent();
    }

    @Override
    public boolean findDriverByPassword(String password) {
        return findDriverByPassword(password).isPresent();
    }

    @Override
    public DriverDTO findDriverByUsernameAndPassword(String username, String password) {
        return mapper.map(repo.findDriverByUsernameAndPassword(username, password).get(), DriverDTO.class);
    }

    @Override
    public void updateDriverNonAvailable(String licenceNo) {
        if (repo.existsById(licenceNo)){
            repo.updateDriverNonAvailable(licenceNo);
        }else {
            throw new RuntimeException("Driver Not Found...");
        }
    }

    @Override
    public void updateDriverAvailable(String licenceNo) {
        if (repo.existsById(licenceNo)){
            repo.updateDriverAvailable(licenceNo);
        }else {
            throw new RuntimeException("Driver Not Found...");
        }
    }

    @Override
    public List<DriverDTO> getAllAvailableDrivers() {
        return mapper.map(repo.getAllAvailableDrivers(), new TypeToken<List<DriverDTO>>() {
        }.getType());
    }

    @Override
    public List<DriverDTO> getRandomDriver() {
        return mapper.map(repo.getAllNonAvailableDrivers(), new TypeToken<List<DriverDTO>>() {
        }.getType());
    }

    @Override
    public List<DriverDTO> getAllNonAvailableDrivers() {
        return repo.getCountOfDriversByStatus(availability);
    }

    @Override
    public int getCountOfDriversByStatus(boolean availability) {
        return mapper.map(repo.getRandomDriver(), new TypeToken<List<DriverDTO>>() {
        }.getType());
    }
}
