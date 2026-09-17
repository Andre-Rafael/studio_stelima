package estetica.stelima.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import estetica.stelima.model.Client;

public interface ClientRepository extends JpaRepository<Client, UUID> {}
