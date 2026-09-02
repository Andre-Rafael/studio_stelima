package estetica.stelima.service;

import java.util.UUID;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import estetica.stelima.model.Offering;
import estetica.stelima.repository.OfferingRepository;

@Service
public class OfferingService {

    @Autowired
    OfferingRepository servicoRepository;

    public void createServico(Offering servico) {
        servico.setAtivo(true);
        servicoRepository.save(servico);
    }

    public Offering updateServico(Offering servico) {
        Offering servicoFound = servicoRepository.findById(servico.getId()).orElse(null);
        if (servicoFound != null) {
            servicoFound.setName(servico.getName());
            servicoFound.setDescription(servico.getDescription());
            servicoFound.setDuration_minutes(servico.getDuration_minutes());
            servicoFound.setPrice(servico.getPrice());
            servicoFound.setCategory(servico.getCategory());
            servicoRepository.save(servicoFound);
            return servicoFound;
        } else {
            throw new RuntimeException("Servico not found with id: " + servico.getId());
        }
    }

    public void deleteServico(UUID id) {
        Offering servicoFound = servicoRepository.findById(id).orElse(null);
        if (servicoFound != null) {
            servicoFound.setAtivo(false);
            servicoRepository.save(servicoFound);
        } else {
            throw new RuntimeException("Servico not found with id: " + id);
        }
    }

    public Offering getOfferingById(UUID id) {
        return servicoRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Servico not found with id: " + id)
        );
    }

    public List<Offering> getAllServicos() {
        return servicoRepository.findAll();
    }

}
