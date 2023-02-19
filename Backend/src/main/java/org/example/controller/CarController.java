package org.example.controller;


import org.example.dto.CarDTO;
import org.example.service.CarService;
import org.example.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("api/v1/car")
@CrossOrigin
public class CarController {

    @Autowired
    CarService service;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCars() {
        return new ResponseUtil(200, "Ok", service.getAllCars());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCar(@RequestBody CarDTO dto) {
        System.out.println(dto.toString());
        service.saveCar(dto);
        return new ResponseUtil(200, "Saved", true);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCar(@RequestBody CarDTO dto) {
        service.updateCar(dto);
        return new ResponseUtil(200, "Updated", true);
    }

    @DeleteMapping(params = {"registrationNo"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCar(@RequestParam String registrationNo) {
        service.deleteCar(registrationNo);
        return new ResponseUtil(200, "deleted", true);
    }

    @GetMapping(path = "/{registrationNo}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCar(@PathVariable String registrationNo) {
        System.out.println(service.searchCar(registrationNo));
        return new ResponseUtil(200, "Ok", service.searchCar(registrationNo));
    }

    @PutMapping(path = "/updateCarStatus/{registrationNO}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCarStatus(@PathVariable String registrationNO, @PathVariable String status) {
        service.updateCarStatus(registrationNO, status);
        return new ResponseUtil(200, "Ok", true);
    }

    @GetMapping(path = "/getByStatus/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCarsByStatus(@PathVariable String status) {
        return new ResponseUtil(200, "Ok", service.getAllCarsByStatus(status));
    }

    @GetMapping(path = "/count/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCountOfCarsByStatus(@PathVariable String status) {
        return new ResponseUtil(200, "Ok", service.getCountOfCarsByStatus(status));
    }

    @PutMapping(path = "/up/{registrationID}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("frontImg") MultipartFile frontImg, @RequestPart("backImg") MultipartFile backImg, @RequestPart("interImg") MultipartFile interImg, @RequestPart("sideImg") MultipartFile sideImg, @PathVariable String registrationID) {
        try {
            String projectPath = String.valueOf(new File("D:\\GDSE\\2nd sem Final\\Easy-Car-Rent-System\\Front_End\\savedImages"));
            File uploadsDir = new File(projectPath + "\\Cars");
            uploadsDir.mkdir();
            frontImg.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + frontImg.getOriginalFilename()));
            backImg.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + backImg.getOriginalFilename()));
            interImg.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + interImg.getOriginalFilename()));
            sideImg.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + sideImg.getOriginalFilename()));

            String frontImgPath = projectPath + "\\Cars\\" + frontImg.getOriginalFilename();
            String backImgPath = projectPath + "\\Cars\\" + backImg.getOriginalFilename();
            String interImgPath = projectPath + "\\Cars\\" + interImg.getOriginalFilename();
            String sideImgPath = projectPath + "\\Cars\\" + sideImg.getOriginalFilename();

            System.out.println(frontImgPath);
            System.out.println(backImgPath);
            System.out.println(interImgPath);
            System.out.println(sideImgPath);
            service.updateCarFilePaths(frontImgPath, backImgPath, interImgPath, sideImgPath, registrationID);

            return new ResponseUtil(200, "Uploaded", true);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil(500, "Error", false);
        }
    }

    @GetMapping(path = "/getRegNo/{type}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarRegistrationNoByType(@PathVariable String type){
        return new ResponseUtil(200,"Ok",service.getCarRegistrationNumbersByType(type));
    }
}