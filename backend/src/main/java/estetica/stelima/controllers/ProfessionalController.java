package estetica.stelima.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import estetica.stelima.dto.request.ProfessionalRequestDTO;
import estetica.stelima.dto.response.ProfessionalResponseDTO;
import estetica.stelima.model.Professional;
import estetica.stelima.service.ProfessionalService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/profissional")
public class ProfessionalController {

    @Autowired
    ProfessionalService professionalService;


    @GetMapping()
    public List<ProfessionalResponseDTO> getAllProfessional() {
        return professionalService.getAllProfessionals()
                .stream()
                .map(ProfessionalResponseDTO::fromEntity)
                .toList();
    }

    @GetMapping("/{id}")
    public ProfessionalResponseDTO getProfessionalById(@PathVariable("id") UUID id) {
        return ProfessionalResponseDTO.fromEntity(professionalService.getProfessionalById(id));
    }

    @PostMapping()
    public void createProfessional(@RequestBody ProfessionalRequestDTO request) {
        professionalService.createProfessional(request.toEntity());
    }
    
    @DeleteMapping("/{id}")
    public void deleteProfessional(@PathVariable("id") UUID id) {
        professionalService.deleteProfessional(id);
    }

    @PutMapping("/{id}")
    public ProfessionalResponseDTO updateProfessional(@PathVariable("id") UUID id,
            @RequestBody ProfessionalRequestDTO request) {
        Professional professional = request.toEntity();
        professional.setId(id);
        return ProfessionalResponseDTO.fromEntity(professionalService.updateProfessional(professional));
    }
    
}
