package estetica.stelima.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import estetica.stelima.dto.request.AppointmentRequestDTO;
import estetica.stelima.dto.response.AppointmentResponseDTO;
import estetica.stelima.model.Appointment;
import estetica.stelima.model.PhotosAppointment;
import estetica.stelima.service.AppointmentService;
import estetica.stelima.service.PhotoService;

@RestController
@RequestMapping("/agendamento")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    PhotoService photoService;

    @GetMapping()
    public List<AppointmentResponseDTO> getAllAgendamento() {
        return appointmentService.getAllAgendamentos()
                .stream()
                .map(AppointmentResponseDTO::fromEntity)
                .toList();
    }

    @GetMapping("/{id}")
    public AppointmentResponseDTO getAgendamentoById(@PathVariable("id") UUID id) {
        return AppointmentResponseDTO.fromEntity(appointmentService.getAgendamentoById(id));
    }

    @PostMapping()
    public void createAgendamento(@RequestBody AppointmentRequestDTO request) {
        appointmentService.createAppointment(request.toEntity());
    }

    @DeleteMapping("/{id}")
    public void cancelAgendamento(@PathVariable("id") UUID id) {
        appointmentService.deleteAgendamento(id);
    }

    @PutMapping("/{id}")
    public AppointmentResponseDTO updateAgendamento(@PathVariable("id") UUID id,
            @RequestBody AppointmentRequestDTO request) {
        Appointment agendamento = request.toEntity();
        agendamento.setId(id);
        return AppointmentResponseDTO.fromEntity(appointmentService.updateAgendamento(agendamento));
    }

    @GetMapping("/{id}/fotos")
    public List<PhotosAppointment> getPhotosByAppointmentId(@PathVariable("id") UUID id) {
        return photoService.getPhotoByAppointmentId(id);
    }

    @GetMapping("/fotos/{photoId}")
    public PhotosAppointment getPhotoById(
        @PathVariable("photoId") UUID photoId
    ) {
        return photoService.getPhotoById(photoId);
    }

    @PostMapping("/{id}/fotos")
    public void addPhotosByAppointmentId(
        @PathVariable("id") UUID id,
        @RequestBody PhotosAppointment photo) {
        photo.setAppointment(appointmentService.getAgendamentoById(id));
        photoService.savePhoto(photo);
    }

    @DeleteMapping("/fotos/{photoId}")
    public void deletePhotosByAppointmentId(
        @PathVariable("photoId") UUID photoId
    ) {
        PhotosAppointment photoFound = photoService.getPhotoById(photoId);
        if (photoFound != null) {
            photoService.deletePhotoById(photoFound.getId());
        }
    }
}
