package estetica.stelima.controllers;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import estetica.stelima.dto.request.OfferingRequestDTO;
import estetica.stelima.dto.response.OfferingResponseDTO;
import estetica.stelima.model.Offering;
import estetica.stelima.service.OfferingService;


@RestController
@RequestMapping("/servico")
public class OfferingController {

    @Autowired
    OfferingService servicoService;

    @GetMapping()
    public List<OfferingResponseDTO> getAllOfferings() {
        return servicoService.getAllServicos().stream()
                .map(OfferingResponseDTO::fromEntity)
                .toList();
    }

    @GetMapping("/{id}")
    public OfferingResponseDTO getOffering(@PathVariable("id") UUID id) {
        return OfferingResponseDTO.fromEntity(servicoService.getOfferingById(id));
    }

    @PostMapping()
    public void createOffering(@RequestBody OfferingRequestDTO servico) {
        servicoService.createServico(servico.toEntity());
    }

    @PutMapping("/{id}")
    public OfferingResponseDTO updateOffering(@PathVariable("id") UUID id,
            @RequestBody OfferingRequestDTO request) {
        Offering offering = request.toEntity();
        offering.setId(id);
        return OfferingResponseDTO.fromEntity(servicoService.updateServico(offering));
    }

    @DeleteMapping("/{id}")
    public void deleteOffering(@PathVariable("id") UUID id) {
        servicoService.deleteServico(id);
    }
}
