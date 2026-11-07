package estetica.stelima.dto.summary;

import java.util.UUID;

public record ProfessionalSummaryDTO(
    UUID id,
    String name,
    String specialty,
    String phone,
    Boolean technicalResponsible
) {
    public static ProfessionalSummaryDTO fromEntity(estetica.stelima.model.Professional profissional) {
        if (profissional != null) {
            return new ProfessionalSummaryDTO(
                profissional.getId(),
                profissional.getName(),
                profissional.getSpecialty(),
                profissional.getPhone(),
                profissional.getTechnicalResponsible()
            );
        }
        return null;
    }
}
