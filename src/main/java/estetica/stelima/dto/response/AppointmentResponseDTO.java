package estetica.stelima.dto.response;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import estetica.stelima.dto.summary.ClientSummaryDTO;
import estetica.stelima.dto.summary.ProfessionalSummaryDTO;
import estetica.stelima.model.Appointment;
import estetica.stelima.model.enums.ScheduleStatus;

/**
 * Representacao de um agendamento devolvida pela API.
 */
public record AppointmentResponseDTO(
        UUID id,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") Date date,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm") LocalTime horaInicio,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm") LocalTime horaFim,
        ScheduleStatus status,
        String obs,
        UUID salaId,
        ClientSummaryDTO cliente,
        ProfessionalSummaryDTO profissional,
        LocalDateTime criadoEm,
        LocalDateTime atualizadoEm) {

    public static AppointmentResponseDTO fromEntity(Appointment agendamento) {
        if (agendamento == null) {
            return null;
        }
        return new AppointmentResponseDTO(
                agendamento.getId(),
                agendamento.getDate(),
                agendamento.getHoraInicio(),
                agendamento.getHoraFim(),
                agendamento.getStatus(),
                agendamento.getObs(),
                agendamento.getSalaId(),
                ClientSummaryDTO.fromEntity(agendamento.getCliente()),
                ProfessionalSummaryDTO.fromEntity(agendamento.getProfissional()),
                agendamento.getCriadoEm(),
                agendamento.getAtualizadoEm());
    }
}
