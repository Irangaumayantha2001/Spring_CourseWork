package org.example.controller;

import org.example.dto.PaymentDTO;
import org.example.service.PaymentService;
import org.example.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin
public class PaymentController {
    @Autowired
    PaymentService service;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPayments() {
        return new ResponseUtil(200, "Ok", service.getAllPayments());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil savePayment(@RequestBody PaymentDTO dto) {
        service.savePayment(dto);
        return new ResponseUtil(200, "Saved", true);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updatePayment(@RequestBody PaymentDTO dto) {
        service.updatePayment(dto);
        return new ResponseUtil(200, "Updated", true);
    }

    @DeleteMapping(params = {"paymentId"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deletePayment(@RequestParam String paymentId) {
        service.deletePayment(paymentId);
        return new ResponseUtil(200, "Deleted", true);
    }

    @GetMapping(path = "/{paymentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchPayment(@PathVariable String paymentId) {
        return new ResponseUtil(200, "Ok", service.searchPayment(paymentId));
    }

    @GetMapping(path = "/{fromDate}/{toDate}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPaymentsByDateRange(@PathVariable LocalDate fromDate, @PathVariable LocalDate toDate) {
        return new ResponseUtil(200, "Ok", service.getAllPaymentsByDateRange(fromDate, toDate));
    }

    @GetMapping(path = "/getAll/{customerId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPaymentsByCustomerId(@PathVariable String customerId) {
        return new ResponseUtil(200, "Ok", service.getAllPaymentsByCustomerId(customerId));
    }

    @GetMapping(path = "/generatePaymentId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generatePaymentId() {
        return new ResponseUtil(200, "Ok", service.generatePaymentId());
    }

}
