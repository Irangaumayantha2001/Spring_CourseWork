package org.example.repo;

import org.example.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, String> {

    Optional<Customer> findCustomerByUsername(String username);

    Optional<Customer> findCustomerByPassword(String password);

    Optional<Customer> findCustomerByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT customerId FROM Customer ORDER BY customerId DESC LIMIT 1", nativeQuery = true)
    String generateCustomerId();

    @Modifying
    @Transactional
    @Query(value = "UPDATE Customer SET status='Accepted' WHERE customerId=:customerId", nativeQuery = true)
    void updateCustomerStatus(@Param("customerId") String customerId);

    @Query(value = "SELECT * FROM Customer WHERE status='Pending'", nativeQuery = true)
    List<Customer> findPendingCustomers();

    @Query(value = "SELECT * FROM Customer WHERE status='Accepted'", nativeQuery = true)
    List<Customer> findAcceptedCustomers();

    @Modifying
    @Transactional
    @Query(value = "UPDATE Customer SET nicFrontImg=:nicFrontImg,nicBackImg=:nicBackImg,licenceImg=:licenceImg WHERE customerId=:customerId", nativeQuery = true)
    void updateCustomerFilePaths(@Param("nicFrontImg") String nicFrontImg, @Param("nicBackImg") String nicBackImg, @Param("licenceImg") String licenceImg, @Param("customerId") String customerId);

    @Query(value = "SELECT COUNT(customerId) FROM Customer WHERE status='Accepted'",nativeQuery = true)
    int countByCustomerId();
}
