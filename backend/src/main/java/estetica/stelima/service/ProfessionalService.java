package estetica.stelima.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import estetica.stelima.model.Professional;
import estetica.stelima.repository.ProfessionalRepository;

@Service
public class ProfessionalService {
    
    @Autowired
    ProfessionalRepository professionalRepository;
    
    public void createProfessional(Professional professional) {
        professional.setActive(true);
        professional.setCreatedAt(LocalDateTime.now());
        professional.setUpdatedAt(LocalDateTime.now());
        professionalRepository.save(professional);
    }

    public Professional getProfessionalById(UUID id) {
        return professionalRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Professional not found with id: " + id)
        );
    }

    public List<Professional> getAllProfessionals() {
        return professionalRepository.findAll();
    }

    public Professional updateProfessional(Professional professional) {
        Professional professionalFound = professionalRepository.findById(professional.getId()).orElse(null);
        if (professionalFound != null) {
            professionalFound.setName(professional.getName());
            professionalFound.setSpecialty(professional.getSpecialty());
            professionalFound.setPhone(professional.getPhone());
            professionalFound.setEmail(professional.getEmail());
            professionalFound.setProfessionalLicense(professional.getProfessionalLicense());
            professionalFound.setTechnicalResponsible(professional.getTechnicalResponsible());
            professionalFound.setUpdatedAt(LocalDateTime.now());

            return professionalRepository.save(professionalFound);
        } else {
            throw new RuntimeException("Professional not found with id: " + professional.getId());
        }
    }

    public void deleteProfessional(UUID id) {
        Professional professionalFound = professionalRepository.findById(id).orElse(null);
        if (professionalFound != null) {
            professionalFound.setActive(false);
            professionalRepository.save(professionalFound);
        }
    }

}
