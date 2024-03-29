package org.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Payment {
    @Id
    private String paymentId;
    private String date;
    private double amount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rentID", referencedColumnName = "rentID",nullable = false)
    private CarRent rental;

    @ManyToOne
    @JoinColumn(name = "customerId",referencedColumnName = "customerId",nullable = false)
    private Customer customer;
}
