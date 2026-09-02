package estetica.stelima.dto.request;

import estetica.stelima.model.Offering;
import estetica.stelima.model.enums.CategoriaServico;

/**
 * Dados aceitos na criacao/atualizacao de um servico.
 * O cliente entra apenas como id; a entidade completa e resolvida no service.
 */
public record OfferingRequestDTO(
        String name,
        String description,
        int duration_minutes,
        Double price,
        CategoriaServico category
    ) {

    public Offering toEntity() {
        Offering offering = new Offering();
        applyTo(offering);
        return offering;
    }

    public void applyTo(Offering offering) {
        offering.setName(name);
        offering.setDescription(description);
        offering.setDuration_minutes(duration_minutes);
        offering.setPrice(price);
        offering.setCategory(category);
    }
}
