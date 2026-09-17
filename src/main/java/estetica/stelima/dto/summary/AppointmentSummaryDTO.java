package estetica.stelima.dto.summary;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import estetica.stelima.model.Appointment;

public record AppointmentSummaryDTO(
    UUID id,
    Date date,
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm") LocalTime horarioInicio,
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm") LocalTime horarioFim
) {
    public static AppointmentSummaryDTO fromEntity(Appointment agendamento) {
        if (agendamento != null) {
            return new AppointmentSummaryDTO(
                agendamento.getId(),
                agendamento.getDate(),
                agendamento.getHoraInicio(),
                agendamento.getHoraFim()
            );
        }
        return null;
    }
}
