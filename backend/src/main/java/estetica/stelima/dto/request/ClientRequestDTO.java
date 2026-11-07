package estetica.stelima.dto.request;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import estetica.stelima.model.Client;

/**
 * Dados aceitos na criacao/atualizacao de um cliente.
 * Campos gerenciados pelo sistema (id, createAt, updateAt) nao sao aceitos.
 */
public record ClientRequestDTO(
        String name,
        String phone,
        String email,
        String cpf,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") Date birthDate,
        String cep,
        String endereco,
        String bairro,
        String numero,
        String complemento) {

    public Client toEntity() {
        Client client = new Client();
        applyTo(client);
        return client;
    }

    public void applyTo(Client client) {
        client.setName(name);
        client.setPhone(phone);
        client.setEmail(email);
        client.setCpf(cpf);
        client.setBirthDate(birthDate);
        client.setCep(cep);
        client.setEndereco(endereco);
        client.setBairro(bairro);
        client.setNumero(numero);
        client.setComplemento(complemento);
        // client.setFotoInicial(fotoInicial);
    }
}
