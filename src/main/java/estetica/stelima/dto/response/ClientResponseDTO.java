package estetica.stelima.dto.response;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import estetica.stelima.model.Client;

/**
 * Representacao de um cliente devolvida pela API.
 * Nao inclui a lista de agendamentos: ela e LAZY na entidade e seria
 * carregada fora da transacao.
 */
public record ClientResponseDTO(
        UUID id,
        String name,
        String phone,
        String email,
        String cpf,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") Date birthDate,
        String cep,
        String endereco,
        String bairro,
        String numero,
        String complemento,
        String fotoInicial,
        LocalDateTime createAt,
        LocalDateTime updateAt) {

    public static ClientResponseDTO fromEntity(Client client) {
        if (client == null) {
            return null;
        }
        return new ClientResponseDTO(
                client.getId(),
                client.getName(),
                client.getPhone(),
                client.getEmail(),
                client.getCpf(),
                client.getBirthDate(),
                client.getCep(),
                client.getEndereco(),
                client.getBairro(),
                client.getNumero(),
                client.getComplemento(),
                client.getFotoInicial(),
                client.getCreateAt(),
                client.getUpdateAt());
    }
}
