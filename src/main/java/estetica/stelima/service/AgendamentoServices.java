package estetica.stelima.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import estetica.stelima.model.Agendamento;
import estetica.stelima.model.enums.ScheduleStatus;
import estetica.stelima.repository.AgendamentoRepository;

@Service
public class AgendamentoServices {

    @Autowired
    AgendamentoRepository agendamentoRepository;

    public void createAgendamento(Agendamento agendamento) {
        agendamentoRepository.save(agendamento);
    }

    public Agendamento updateAgendamento(Agendamento agendamento) {
        Agendamento agendamentoFound = agendamentoRepository.findById(agendamento.getId()).orElse(null);
        if (agendamentoFound != null) {
            agendamentoFound.setDate(agendamento.getDate());
            agendamentoFound.setHoraInicio(agendamento.getHoraInicio());
            agendamentoFound.setHoraFim(agendamento.getHoraFim());
            agendamentoFound.setStatus(agendamento.getStatus());
            agendamentoFound.setObs(agendamento.getObs());
            agendamentoFound.setSalaId(agendamento.getSalaId());
            agendamentoFound.setClienteId(agendamento.getClienteId());
            agendamentoFound.setProfissionalId(agendamento.getProfissionalId());
            agendamentoFound.setAtualizadoEm(agendamento.getAtualizadoEm());

            return agendamentoRepository.save(agendamentoFound);
        } else {
            throw new RuntimeException("Agendamento not found with id: " + agendamento.getId());
        }

    }

    public void deleteAgendamento(Long id) {
        Agendamento agendamentoFound = agendamentoRepository.findById(id).orElse(null);
        if (agendamentoFound != null) {
            agendamentoFound.setStatus(ScheduleStatus.CANCELADO);
            agendamentoRepository.save(agendamentoFound);
        } else {
            throw new RuntimeException("Agendamento not found with id: " + id);
        }
    }

    public Agendamento getAgendamentoById(Long id) {
        return agendamentoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException(
            "Agendamento not found with id: " + id
        )); 
    }

    public List<Agendamento> getAllAgendamentos() {
        return agendamentoRepository.findAll();
    }
}
