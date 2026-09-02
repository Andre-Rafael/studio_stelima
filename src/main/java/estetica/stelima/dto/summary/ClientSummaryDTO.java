package estetica.stelima.dto.summary;

import java.util.UUID;

import estetica.stelima.model.Client;

/**
 * Versao reduzida do cliente, usada quando ele aparece aninhado
 * em outro recurso (ex.: agendamento).
 */
public record ClientSummaryDTO(
        UUID id,
        String name,
        String phone) {

    public static ClientSummaryDTO fromEntity(Client client) {
        if (client == null) {
            return null;
        }
        return new ClientSummaryDTO(client.getId(), client.getName(), client.getPhone());
    }
}
