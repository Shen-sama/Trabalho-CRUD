package com.javanauta.agno.inicalspring.infrastructure.entity;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Cria os metodos get e set com a extensão lombok
@Setter
@Getter
//Cria o contrutor com os atibutos e tambem vazio
@NoArgsConstructor
@AllArgsConstructor
//Demonstra que e uma entidade para o Spring
@Entity
//Demosntra que e uma tabela para o Spring
@Table(name  = "usuario")

public class Usuario {

    //Demosntra de e um coluna e com id primario
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;
    //Column demonstr que e uma coluna da tabela
    @Column(name = "nome", length = 100)
    private String nome;
    @Column(name = "email", length = 100)
    private String email;
    @Column(name = "senha", length = 10)
    private String senha;

    //demosntra o relacionamento de um para muitos, no caso que o usuario pode ter mais de um numero de telefone
    @OneToMany(cascade =  CascadeType.ALL, orphanRemoval = true)
    //define a coluna de junção estrangeira na tabela
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private List<Endereco> enderecos;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private List<Telefone> telefones;


}
