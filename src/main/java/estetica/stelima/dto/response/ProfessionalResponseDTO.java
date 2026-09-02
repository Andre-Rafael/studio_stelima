package estetica.stelima.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

import estetica.stelima.model.Professional;

public record ProfessionalResponseDTO(
    UUID id,
    String name,
    String specialty,
    String phone,
    String email,
    String professionalLicense,
    Boolean technicalResponsible,
    LocalDateTime createdAt
    // List<AppointmentSummaryDTO> appointments
) {
    public static ProfessionalResponseDTO fromEntity(Professional profissional) {
        if (profissional != null) {
            // List<AppointmentSummaryDTO> appointmentSummaries = profissional.getAppointments().stream()
            //     .map(AppointmentSummaryDTO::fromEntity)
            //     .toList();

            return new ProfessionalResponseDTO(
                profissional.getId(),
                profissional.getName(),
                profissional.getSpecialty(),
                profissional.getPhone(),
                profissional.getEmail(),
                profissional.getProfessionalLicense(),
                profissional.getTechnicalResponsible(),
                profissional.getCreatedAt()
                // appointmentSummaries
            );
        }
        return null;
    }
    
}
