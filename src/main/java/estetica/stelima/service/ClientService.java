package estetica.stelima.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import estetica.stelima.model.Client;
import estetica.stelima.repository.ClientRepository;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public void createClient(Client client) {
        client.setCreateAt(LocalDateTime.now());
        client.setUpdateAt(LocalDateTime.now());
        clientRepository.save(client);
    }

    public Client updateClient(Client client) {
        Client clientFound = clientRepository.findById(client.getId()).orElse(null);
        if (clientFound != null) {
            clientFound.setName(client.getName());
            clientFound.setPhone(client.getPhone());
            clientFound.setEmail(client.getEmail());
            clientFound.setCpf(client.getCpf());
            clientFound.setBirthDate(client.getBirthDate());
            clientFound.setCep(client.getCep());
            clientFound.setEndereco(client.getEndereco());
            clientFound.setBairro(client.getBairro());
            clientFound.setNumero(client.getNumero());
            clientFound.setComplemento(client.getComplemento());
            clientFound.setFotoInicial(client.getFotoInicial());
            clientFound.setUpdateAt(LocalDateTime.now());

            return clientRepository.save(clientFound);
        } else {
            throw new RuntimeException("Client not found with id: " + client.getId());
        }
    }

    public void deleteClient(UUID id) {
        Client clientFound = clientRepository.findById(id).orElse(null);
        if (clientFound != null) {
            clientRepository.delete(clientFound);
        } else {
            throw new RuntimeException("Client not found with id: " + id);
        }
    }

    public Client getClientById(UUID id) {
        return clientRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Client not found with id: " + id)
        );
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
