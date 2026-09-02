package estetica.stelima.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import estetica.stelima.model.Appointment;

/**
 * AgendamentoRepository
 */
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {}
