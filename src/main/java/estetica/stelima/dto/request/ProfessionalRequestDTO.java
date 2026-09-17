package estetica.stelima.dto.request;

import java.time.LocalDateTime;

import estetica.stelima.model.Professional;

public record ProfessionalRequestDTO(
    String name,
    String specialty,
    String phone,
    String email,
    String professionalLicense,
    Boolean technicalResponsible
) {

    public Professional toEntity() {
        Professional profissional = new Professional();
        applyTo(profissional);
        return profissional;
    }

    public void applyTo(Professional profissional) {
        profissional.setName(name);
        profissional.setSpecialty(specialty);
        profissional.setPhone(phone);
        profissional.setEmail(email);
        profissional.setProfessionalLicense(professionalLicense);
        profissional.setTechnicalResponsible(technicalResponsible);
        LocalDateTime now = LocalDateTime.now();
        profissional.setUpdatedAt(now);
    }

}
