package estetica.stelima.dto.summary;

import estetica.stelima.model.Offering;
import estetica.stelima.model.enums.CategoriaServico;

public record OfferingSummaryDTO(
        String name,
        String description,
        CategoriaServico category
    ) {

    public static OfferingSummaryDTO fromEntity(Offering offering){
        if (offering == null) {
            return null;
        }
        return new OfferingSummaryDTO(offering.getName(), offering.getDescription(), offering.getCategory());
    }
    
}
