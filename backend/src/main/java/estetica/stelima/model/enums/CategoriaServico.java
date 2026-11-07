package estetica.stelima.model.enums;

import java.util.Arrays;

public enum CategoriaServico {
    ESTETICA,
    BELEZA,
    BEM_ESTAR;

    public static CategoriaServico from(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return Arrays.stream(values())
            .filter(v -> v.name().equalsIgnoreCase(value))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Invalid financial status: " + value));
    }

    public static String toStringValue(CategoriaServico categoriaServico) {
        return categoriaServico != null ? categoriaServico.name() : null;
    }
}

// public enum CategoriaServicoEstetica {
//     FACIAL,
//     CORPORAL
// }

// public enum CategoriaServicoBeleza {
//     SOBRANCELHAS,
//     LABIOS,
//     CILIOS,
// }

// public enum CategoriaServicoBemEstar {
//     MESSAGENS,
//     RITUAIS
// }