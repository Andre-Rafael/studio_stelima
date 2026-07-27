package estetica.stelima.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

import estetica.stelima.model.enums.ScheduleStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "AGENDAMENTO")
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DATE", nullable = false)
    private Date date;

    @Column(name = "HORA_INICIO", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "HORA_FIM", nullable = false)
    private LocalTime horaFim;

    @Column(name = "STATUS", nullable = false)
    private ScheduleStatus status;

    @Column(name = "OBSERVATION", nullable = false)
    private String obs;

    @Column(name = "ROOM_ID", nullable = false)
    private Long salaId;

    // @ManyToOne
    // @JoinColumn(name = "CLIENT_ID", nullable = false)
    @Column(name = "CLIENT_ID", nullable = false)
    private Long clienteId;

    @Column(name = "PROFISSIONAL_ID", nullable = false)
    private Long profissionalId;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime criadoEm;

    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime atualizadoEm;

    public Agendamento(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFim() {
        return horaFim;
    }

    public void setHoraFim(LocalTime horaFim) {
        this.horaFim = horaFim;
    }

    public ScheduleStatus getStatus() {
        return status;
    }

    public void setStatus(ScheduleStatus status) {
        this.status = status;
    }

    public String getObs() {
        return obs;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Long getSalaId() {
        return salaId;
    }

    public void setSalaId(Long salaId) {
        this.salaId = salaId;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getProfissionalId() {
        return profissionalId;
    }

    public void setProfissionalId(Long profissionalId) {
        this.profissionalId = profissionalId;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public LocalDateTime getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(LocalDateTime atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((date == null) ? 0 : date.hashCode());
        result = prime * result + ((horaInicio == null) ? 0 : horaInicio.hashCode());
        result = prime * result + ((horaFim == null) ? 0 : horaFim.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((obs == null) ? 0 : obs.hashCode());
        result = prime * result + ((salaId == null) ? 0 : salaId.hashCode());
        result = prime * result + ((clienteId == null) ? 0 : clienteId.hashCode());
        result = prime * result + ((profissionalId == null) ? 0 : profissionalId.hashCode());
        result = prime * result + ((criadoEm == null) ? 0 : criadoEm.hashCode());
        result = prime * result + ((atualizadoEm == null) ? 0 : atualizadoEm.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Agendamento other = (Agendamento) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (date == null) {
            if (other.date != null)
                return false;
        } else if (!date.equals(other.date))
            return false;
        if (horaInicio == null) {
            if (other.horaInicio != null)
                return false;
        } else if (!horaInicio.equals(other.horaInicio))
            return false;
        if (horaFim == null) {
            if (other.horaFim != null)
                return false;
        } else if (!horaFim.equals(other.horaFim))
            return false;
        if (status != other.status)
            return false;
        if (obs == null) {
            if (other.obs != null)
                return false;
        } else if (!obs.equals(other.obs))
            return false;
        if (salaId == null) {
            if (other.salaId != null)
                return false;
        } else if (!salaId.equals(other.salaId))
            return false;
        if (clienteId == null) {
            if (other.clienteId != null)
                return false;
        } else if (!clienteId.equals(other.clienteId))
            return false;
        if (profissionalId == null) {
            if (other.profissionalId != null)
                return false;
        } else if (!profissionalId.equals(other.profissionalId))
            return false;
        if (criadoEm == null) {
            if (other.criadoEm != null)
                return false;
        } else if (!criadoEm.equals(other.criadoEm))
            return false;
        if (atualizadoEm == null) {
            if (other.atualizadoEm != null)
                return false;
        } else if (!atualizadoEm.equals(other.atualizadoEm))
            return false;
        return true;
    }

    
}
