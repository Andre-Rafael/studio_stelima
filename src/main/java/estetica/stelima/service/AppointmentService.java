package estetica.stelima.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import estetica.stelima.model.Appointment;
import estetica.stelima.model.Client;
import estetica.stelima.model.Offering;
import estetica.stelima.model.Professional;
import estetica.stelima.model.enums.ScheduleStatus;
import estetica.stelima.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    ClientService clientService;

    @Autowired
    OfferingService offeringService;

    @Autowired
    ProfessionalService professionalService;

    private Boolean checkExistDependencies(Appointment agendamento) {
        Client clientFound = clientService.getClientById(agendamento.getCliente().getId());
        Offering offeringFound = offeringService.getOfferingById(agendamento.getOffering().getId());
        Professional professionalFound = professionalService.getProfessionalById(agendamento.getProfissional().getId());
        return clientFound != null && offeringFound != null && professionalFound != null;
    }

    public void createAppointment(Appointment appointment) {
        if (!checkExistDependencies(appointment)) {
            throw new RuntimeException("Client, offering, or professional not found with id: " + appointment.getCliente().getId());
        }
        appointment.setCriadoEm(LocalDateTime.now());
        appointment.setAtualizadoEm(LocalDateTime.now());
        appointmentRepository.save(appointment);
    }

    public Appointment updateAgendamento(Appointment appointment) {
        Appointment agendamentoFound = appointmentRepository.findById(appointment.getId()).orElse(null);
        if (agendamentoFound != null) {
            agendamentoFound.setDate(appointment.getDate());
            agendamentoFound.setHoraInicio(appointment.getHoraInicio());
            agendamentoFound.setHoraFim(appointment.getHoraFim());
            agendamentoFound.setStatus(appointment.getStatus());
            agendamentoFound.setObs(appointment.getObs());
            agendamentoFound.setSalaId(appointment.getSalaId());
            agendamentoFound.setCliente(appointment.getCliente());
            agendamentoFound.setProfissional(appointment.getProfissional());
            agendamentoFound.setAtualizadoEm(LocalDateTime.now());

            return appointmentRepository.save(agendamentoFound);
        } else {
            throw new RuntimeException("Agendamento not found with id: " + appointment.getId());
        }

    }

    public void deleteAgendamento(UUID id) {
        Appointment agendamentoFound = appointmentRepository.findById(id).orElse(null);
        if (agendamentoFound != null) {
            agendamentoFound.setStatus(ScheduleStatus.CANCELADO);
            appointmentRepository.save(agendamentoFound);
        } else {
            throw new RuntimeException("Agendamento not found with id: " + id);
        }
    }

    public Appointment getAgendamentoById(UUID id) {
        return appointmentRepository.findById(id)
        .orElseThrow(() -> new RuntimeException(
            "Agendamento not found with id: " + id
        )); 
    }

    public List<Appointment> getAllAgendamentos() {
        return appointmentRepository.findAll();
    }
}
