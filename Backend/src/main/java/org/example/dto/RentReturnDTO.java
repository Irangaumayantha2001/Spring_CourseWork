package org.example.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class RentReturnDTO {
    private String returnId;
    private LocalDate date;
    private double noOfKm;
    private CarRentDTO rental;
    private PaymentDTO payment;

}
