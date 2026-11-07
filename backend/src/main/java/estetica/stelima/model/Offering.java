package estetica.stelima.model;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import estetica.stelima.model.enums.CategoriaServico;
import jakarta.persistence.*;

@Entity
@Table(name = "SERVICO")
public class Offering implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "NOME", nullable = false)
    private String name;

    @Column(name = "DESCRICAO", nullable = false)
    private String description;

    @Column(name = "DURACAO_MIN", nullable = false)
    private int duration_minutes;

    @Column(name = "PRECO", nullable = false)
    private Double price;

    @Column(name = "CATEGORIA", nullable = false)
    private CategoriaServico category;

    @Column(name = "ATIVO", nullable = false)
    private boolean ativo;

    @OneToMany(mappedBy = "offering")
    private List<Appointment> appointments;

    public Offering() {

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

    public void setName(String nome) {
        this.name = nome;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String descricao) {
        this.description = descricao;
    }

    public int getDuration_minutes() {
        return duration_minutes;
    }

    public void setDuration_minutes(int duracao_min) {
        this.duration_minutes = duracao_min;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double preco) {
        this.price = preco;
    }

    public CategoriaServico getCategory() {
        return category;
    }

    public void setCategory(CategoriaServico categoria) {
        this.category = categoria;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> agendamentoServicos) {
        this.appointments = agendamentoServicos;
    }

}
