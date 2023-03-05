package org.example.service.impl;


import org.example.dto.RentReturnDTO;
import org.example.entity.CarRentReturn;
import org.example.repo.RentReturnRepo;
import org.example.service.RentReturnService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RentReturnServiceImpl implements RentReturnService {

    @Autowired
    RentReturnRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveCarRentReturn(RentReturnDTO dto) {
        if (!repo.existsById(dto.getReturnId())) {
            repo.save(mapper.map(dto, CarRentReturn.class));
        } else {
            throw new RuntimeException("CarRentReturn Already Exists...");
        }
    }

    @Override
    public void updateCarRentReturn(RentReturnDTO dto) {
        if (repo.existsById(dto.getReturnId())) {
            repo.save(mapper.map(dto, CarRentReturn.class));
        } else {
            throw new RuntimeException("No Such CarRentReturn To Update");
        }
    }

    @Override
    public void deleteCarRentReturn(String returnId) {
        if (repo.existsById(returnId)) {
            repo.deleteById(returnId);
        } else {
            throw new RuntimeException("No Such CarRentReturn To Delete");
        }
    }

    @Override
    public RentReturnDTO searchCarRentReturn(String returnId) {
        if (repo.existsById(returnId)) {
            return mapper.map(repo.findById(returnId).get(), RentReturnDTO.class);
        } else {
            throw new RuntimeException("CarRentReturn Not Found...");
        }
    }

    @Override
    public List<RentReturnDTO> getAllCarRentReturns() {
        return mapper.map(repo.findAll(), new TypeToken<List<RentReturnDTO>>() {
        }.getType());
    }

    @Override
    public String generateReturnId() {
        String lastId = repo.generateReturnId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "RTN-000" + tempId;
            } else if (tempId <= 99) {
                id = "RTN-00" + tempId;
            } else if (tempId <= 999) {
                id = "RTN-0" + tempId;
            } else if (tempId <= 9999) {
                id = "RTN-" + tempId;
            }
        } else {
            id = "RTN-0001";
        }
        return id;
    }
}
