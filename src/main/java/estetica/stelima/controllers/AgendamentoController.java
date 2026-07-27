package estetica.stelima.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import estetica.stelima.model.Agendamento;
import estetica.stelima.service.AgendamentoServices;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    AgendamentoServices agendamentoService;

    @GetMapping()
    public List<Agendamento> getAllAgendamento() {
        return agendamentoService.getAllAgendamentos();
    }

    @GetMapping("/{id}")
    public Agendamento getAgendamentoById(@PathVariable("id") Long id) {
        return agendamentoService.getAgendamentoById(id);
    }

    @PostMapping()
    public void createAgendamento(@RequestBody Agendamento agendamento) {
        agendamentoService.createAgendamento(agendamento);
    }

    @DeleteMapping("/{id}")
    public void cancelAgendamento(@PathVariable("id") Long id) {
        agendamentoService.deleteAgendamento(id);
    }

    @PutMapping()
    public Agendamento updateAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoService.updateAgendamento(agendamento);
    }
}
