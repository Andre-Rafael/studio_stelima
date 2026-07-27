package estetica.stelima.model;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
@Table(name = "CLIENTE")
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "PHONE", nullable = false)
    private String phone;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "CPF", nullable = false)
    private String cpf;

    @Column(name = "BIRTH_DATE", nullable = false)
    private String birthDate;

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
    private String foto_inicial;

    @Column(name = "CREATE_AT", nullable = false)
    private String createAt;

    @Column(name = "UPDATE_AT", nullable = false)
    private String updateAt;

}
