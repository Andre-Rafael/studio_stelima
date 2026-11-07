package estetica.stelima.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import estetica.stelima.model.PhotosAppointment;
import estetica.stelima.repository.PhotosAppointmentRepository;

@Service
public class PhotoService {
    
    @Autowired
    PhotosAppointmentRepository photosAppointmentRepository;

    public void savePhoto(PhotosAppointment photo) {
        photo.setCreatedAt(LocalDateTime.now());
        photosAppointmentRepository.save(photo);
    }

    public PhotosAppointment getPhotoById(UUID id) {
        return photosAppointmentRepository.findById(id).orElse(null);
    }

    public List<PhotosAppointment> getPhotoByAppointmentId(UUID appointmentId) {
        return photosAppointmentRepository.findByAppointmentId(appointmentId);
    }

    public List<PhotosAppointment> getAllPhotos() {
        return photosAppointmentRepository.findAll();
    }

    public void deletePhotoById(UUID id) {
        photosAppointmentRepository.deleteById(id);
    }
}
