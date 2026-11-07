package estetica.stelima.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;

@Entity
@Table(name = "PROFISSIONAL")
public class Professional implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "NAME", nullable = false)
    private String name;
    
    @Column(name = "SPECIALTY", nullable = false)
    private String specialty;
    
    @Column(name = "PHONE", nullable = false)
    private String phone;
    
    @Column(name = "EMAIL", nullable = false)
    private String email;
    
    @Column(name = "PROFESSIONAL_LICENSE", nullable = false)
    private String professionalLicense;
    
    @Column(name = "TECHNICAL_RESPONSIBLE", nullable = false)
    private Boolean technicalResponsible;
    
    @Column(name = "ACTIVE", nullable = false)
    private Boolean active;
    
    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "profissional")
    private List<Appointment> appointments;

    public Professional() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfessionalLicense() {
        return professionalLicense;
    }

    public void setProfessionalLicense(String professionalLicense) {
        this.professionalLicense = professionalLicense;
    }

    public Boolean getTechnicalResponsible() {
        return technicalResponsible;
    }

    public void setTechnicalResponsible(Boolean technicalResponsible) {
        this.technicalResponsible = technicalResponsible;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    
    
}
