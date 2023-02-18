package org.example.config;

import javafx.application.Platform;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionManager;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.sql.DriverManager;


@Configuration

public class JPAConfig {

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(DataSource ds, JpaVendorAdapter va) {
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        factoryBean.setPackagesToScan("org.example.entity");
        factoryBean.setDataSource(ds);
        factoryBean.setJpaVendorAdapter(va);
    return factoryBean;

    }

    @Bean
    public DataSource dataSource(){
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost:3306/db?createDatabaseIfNotExist=true");
        ds.setUsername("iranga");
        ds.setPassword("1234");
        return ds;
    }

    @Bean
    public  JpaVendorAdapter jpaVendorAdapter(){
        HibernateJpaVendorAdapter va = new HibernateJpaVendorAdapter();
        va.setDatabase(Database.MYSQL);
        va.setDatabasePlatform("org.hibernate.dialect.MySQL8Dialect");
        va.setGenerateDdl(true);
        va.setShowSql(true);
        return va;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf){
        return  new JpaTransactionManager(emf);
    }
}



