package org.example.service;



import org.example.dto.MaintenanceDTO;

import java.util.List;

public interface MaintenanceService {
    void addMaintenance(MaintenanceDTO dto);

    void updateMaintenance(MaintenanceDTO dto);

    void deleteMaintenance(String maintenanceId);

    MaintenanceDTO searchMaintenance(String maintenanceId);

    List<MaintenanceDTO> getAllMaintenances();

    String generateMaintenanceId();

    void updateMaintenanceCost(String maintenanceId, double cost);

    List<MaintenanceDTO> getAllUnderMaintenances();
}
