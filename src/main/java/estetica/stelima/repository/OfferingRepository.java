package estetica.stelima.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import estetica.stelima.model.Offering;

public interface OfferingRepository extends JpaRepository<Offering, UUID> {}
