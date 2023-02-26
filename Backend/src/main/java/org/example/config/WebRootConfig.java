package org.example.config;

import org.example.service.impl.*;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(JPAConfig.class)
@ComponentScan(basePackageClasses = {AdminServiceImpl.class, CarRentServiceImpl.class, CarServiceImpl.class, CustomerServiceImpl.class, DriverServiceImpl.class, LoginServiceImpl.class, PaymentServiceImpl.class})
public class WebRootConfig {
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
