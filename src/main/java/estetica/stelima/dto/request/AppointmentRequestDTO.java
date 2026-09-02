package estetica.stelima.dto.request;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import estetica.stelima.model.Appointment;
import estetica.stelima.model.Client;
import estetica.stelima.model.Offering;
import estetica.stelima.model.Professional;
import estetica.stelima.model.enums.ScheduleStatus;

public record AppointmentRequestDTO(
    Date date,
    LocalTime horaInicio,
    LocalTime horaFim,
    ScheduleStatus status,
    String obs,
    UUID salaId,
    Client cliente,
    Professional profissional,
    Offering offering
) {

    public Appointment toEntity() {
        Appointment agendamento = new Appointment();
        applyTo(agendamento);
        return agendamento;
    }

    public void applyTo(Appointment agendamento) {
        agendamento.setDate(date);
        agendamento.setHoraInicio(horaInicio);
        agendamento.setHoraFim(horaFim);
        agendamento.setStatus(status);
        agendamento.setObs(obs);
        agendamento.setSalaId(salaId);
        agendamento.setCliente(cliente);
        agendamento.setProfissional(profissional);
        agendamento.setOffering(offering);
    }
    
}
