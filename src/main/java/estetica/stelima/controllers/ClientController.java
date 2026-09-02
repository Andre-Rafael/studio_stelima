package estetica.stelima.controllers;


import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import estetica.stelima.dto.request.ClientRequestDTO;
import estetica.stelima.dto.response.ClientResponseDTO;
import estetica.stelima.model.Client;
import estetica.stelima.service.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    private String treatsImage(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        if (file.isEmpty()) {
            throw new IOException("File is required");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("Invalid file type");
        }

        UUID randomUUID = UUID.randomUUID();
        String newFileName = String.format("%s.jpg", randomUUID.toString());
        Path filePath = uploadPath.resolve(newFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath.toString();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createClient(
        @RequestPart("cliente") ClientRequestDTO request,
        @RequestPart("file") MultipartFile file
    ) throws IOException {    
        String fileName = treatsImage(file);
        Client client = request.toEntity();
        client.setFotoInicial(fileName);
        clientService.createClient(client);
        return ResponseEntity.ok("Client created successfully");
    }

    @GetMapping()
    public List<ClientResponseDTO> getAllClients() {
        return clientService.getAllClients()
                .stream()
                .map(ClientResponseDTO::fromEntity)
                .toList();
    }

    @GetMapping("/{id}")
    public ClientResponseDTO getClientById(@PathVariable("id") UUID id) {
        return ClientResponseDTO.fromEntity(clientService.getClientById(id));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ClientResponseDTO updateClient(
        @PathVariable("id") UUID id, 
        @RequestPart("cliente") ClientRequestDTO request,
        @RequestPart("file") MultipartFile file
    ) throws IOException {
        Client client = request.toEntity();
        String fileName = treatsImage(file);
        client.setFotoInicial(fileName);
        client.setId(id);
        return ClientResponseDTO.fromEntity(clientService.updateClient(client));
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable("id") UUID id) {
        clientService.deleteClient(id);
    }
}
