package estetica.stelima.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import estetica.stelima.model.Professional;

public interface ProfessionalRepository extends JpaRepository<Professional, UUID> {}
