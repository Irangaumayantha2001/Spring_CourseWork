package org.example.config;

import org.example.controller.*;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = {AdminController.class, CarController.class, CarRentController.class, CustomerController.class, DriverController.class, LoginController.class, PaymentController.class})
public class WebAppConfig {

}
