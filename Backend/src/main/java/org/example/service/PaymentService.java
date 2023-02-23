package org.example.service;

import org.example.dto.PaymentDTO;

import java.time.LocalDate;
import java.util.List;

public interface PaymentService {
    void savePayment(PaymentDTO dto);

    void updatePayment(PaymentDTO dto);

    void deletePayment(String paymentId);

    PaymentDTO searchPayment(String paymentId);

    List<PaymentDTO> getAllPayments();

    List<PaymentDTO> getAllPaymentsByDateRange(LocalDate fromDate, LocalDate toDate);

    List<PaymentDTO> getAllPaymentsByCustomerId(String customerId);

    String generatePaymentId();
}
