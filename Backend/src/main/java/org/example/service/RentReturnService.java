package org.example.service;



import org.example.dto.RentReturnDTO;

import java.util.List;

public interface RentReturnService {
    void saveCarRentReturn(RentReturnDTO dto);

    void updateCarRentReturn(RentReturnDTO dto);

    void deleteCarRentReturn(String returnId);

    RentReturnDTO searchCarRentReturn(String returnId);

    List<RentReturnDTO> getAllCarRentReturns();

    String generateReturnId();
}
