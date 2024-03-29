package org.example.controller;

import org.example.dto.CarRentDTO;
import org.example.service.CarRentService;
import org.example.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/CarRent")
@CrossOrigin
public class CarRentController {

    @Autowired
   private CarRentService service;

    @GetMapping
    public ResponseUtil getAllCarRents(){
        return new ResponseUtil(200,"ok",service.getAllCarRents());
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil addCarRent(@RequestBody CarRentDTO dto) {
        System.out.println(dto.toString());
       service.addCarRent(dto);
        return new ResponseUtil(200, "Saved", true);
    }
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCarRent(@RequestBody CarRentDTO dto) {
        service.updateCarRent(dto);
        return new ResponseUtil(200, "Updated", true);
    }
    @DeleteMapping(params = {"rentId"})
    public ResponseUtil deleteCarRent(@RequestParam String rentId) {
        service.deleteCarRent(rentId);
        return new ResponseUtil(200, "Deleted", true);
    }

    @GetMapping(path = "/{rentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCarRent(@PathVariable String rentId) {
        return new ResponseUtil(200, "Ok", service.searchCarRent(rentId));
    }

    @PutMapping(path = "/{rentId}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCarRentStatus(@PathVariable String rentId, @PathVariable String status) {
        service.updateCarRentStatus(rentId, status);
        return new ResponseUtil(200, "Ok", true);
    }
    @GetMapping(path = "/get/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCarRentsByStatus(@PathVariable String status) {
        return new ResponseUtil(200, "Ok", service.getCarRentsByStatus(status));
    }

    @GetMapping(path = "/getCarRents/{status}/{licenceNo}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCarRentsByDrivingLicence(@PathVariable String status, @PathVariable String licenceNo) {
        return new ResponseUtil(200, "Ok", service.getCarRentsByDrivingLicenceNo(status, licenceNo));
    }

    @GetMapping(path = "/generateRentId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateRentId() {
        return new ResponseUtil(200, "Ok", service.generateRentId());
    }

}
