package estetica.stelima.dto.response;

import java.util.UUID;
import java.util.List;

import estetica.stelima.dto.summary.AppointmentSummaryDTO;

import estetica.stelima.model.Offering;
import estetica.stelima.model.enums.CategoriaServico;

public record OfferingResponseDTO(
    UUID id,
    String nome,
    String descricao,
    int duracao_min,
    double preco,
    CategoriaServico categoria,
    boolean ativo
    // List<AppointmentSummaryDTO> agendamentoServicos

) {

    public static OfferingResponseDTO fromEntity(Offering offering) {
        if (offering == null) {
            return null;
        }

        // List<AppointmentSummaryDTO> summaryAppointment = offering.getAppointments()
        //     .stream()
        //     .map(appointment -> AppointmentSummaryDTO.fromEntity(appointment))
        //     .toList();

        return new OfferingResponseDTO(
            offering.getId(),
            offering.getName(),
            offering.getDescription(),
            offering.getDuration_minutes(),
            offering.getPrice(),
            offering.getCategory(),
            offering.isAtivo()
        );
    }

}
