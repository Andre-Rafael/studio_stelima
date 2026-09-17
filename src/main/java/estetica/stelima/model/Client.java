package estetica.stelima.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;
import jakarta.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "CLIENTE")
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonIgnore
    private UUID id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "PHONE", nullable = false)
    private String phone;

    @Column(name = "EMAIL", nullable = true)
    @Email(
        message = "Invalid email format"
    )
    private String email;

    @Column(name = "CPF", nullable = false)
    private String cpf;

    @Column(name = "BIRTH_DATE", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date birthDate;

    @Column(name = "CEP", nullable = false)
    private String cep;

    @Column(name = "ENDERECO", nullable = false)
    private String endereco;

    @Column(name = "BAIRRO", nullable = false)
    private String bairro;

    @Column(name = "NUMERO", nullable = false)
    private String numero;

    @Column(name = "COMPLEMENTO", nullable = false)
    private String complemento;

    @Column(name = "INITIAL_PHOTO", nullable = false)
    private String fotoInicial;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime createAt;

    @Column(name = "UPDATE_AT", nullable = false)
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "cliente")
    private List<Appointment> agendamentos;

    public Client(){

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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getFotoInicial() {
        return fotoInicial;
    }

    public void setFotoInicial(String foto_inicial) {
        this.fotoInicial = foto_inicial;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((phone == null) ? 0 : phone.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((cpf == null) ? 0 : cpf.hashCode());
        result = prime * result + ((birthDate == null) ? 0 : birthDate.hashCode());
        result = prime * result + ((cep == null) ? 0 : cep.hashCode());
        result = prime * result + ((endereco == null) ? 0 : endereco.hashCode());
        result = prime * result + ((bairro == null) ? 0 : bairro.hashCode());
        result = prime * result + ((numero == null) ? 0 : numero.hashCode());
        result = prime * result + ((complemento == null) ? 0 : complemento.hashCode());
        result = prime * result + ((fotoInicial == null) ? 0 : fotoInicial.hashCode());
        result = prime * result + ((createAt == null) ? 0 : createAt.hashCode());
        result = prime * result + ((updateAt == null) ? 0 : updateAt.hashCode());
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
        Client other = (Client) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (phone == null) {
            if (other.phone != null)
                return false;
        } else if (!phone.equals(other.phone))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (cpf == null) {
            if (other.cpf != null)
                return false;
        } else if (!cpf.equals(other.cpf))
            return false;
        if (birthDate == null) {
            if (other.birthDate != null)
                return false;
        } else if (!birthDate.equals(other.birthDate))
            return false;
        if (cep == null) {
            if (other.cep != null)
                return false;
        } else if (!cep.equals(other.cep))
            return false;
        if (endereco == null) {
            if (other.endereco != null)
                return false;
        } else if (!endereco.equals(other.endereco))
            return false;
        if (bairro == null) {
            if (other.bairro != null)
                return false;
        } else if (!bairro.equals(other.bairro))
            return false;
        if (numero == null) {
            if (other.numero != null)
                return false;
        } else if (!numero.equals(other.numero))
            return false;
        if (complemento == null) {
            if (other.complemento != null)
                return false;
        } else if (!complemento.equals(other.complemento))
            return false;
        if (fotoInicial == null) {
            if (other.fotoInicial != null)
                return false;
        } else if (!fotoInicial.equals(other.fotoInicial))
            return false;
        if (createAt == null) {
            if (other.createAt != null)
                return false;
        } else if (!createAt.equals(other.createAt))
            return false;
        if (updateAt == null) {
            if (other.updateAt != null)
                return false;
        } else if (!updateAt.equals(other.updateAt))
            return false;
        return true;
    }

    public List<Appointment> getAgendamentos() {
        return agendamentos;
    }

    public void setAgendamentos(List<Appointment> agendamentos) {
        this.agendamentos = agendamentos;
    }
    
}
