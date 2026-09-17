package estetica.stelima.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import estetica.stelima.model.PhotosAppointment;

import java.util.List;
import java.util.UUID;

@Repository
public interface PhotosAppointmentRepository extends JpaRepository<PhotosAppointment, UUID> {
    
    List<PhotosAppointment> findByAppointmentId(UUID appointmentId);
}
