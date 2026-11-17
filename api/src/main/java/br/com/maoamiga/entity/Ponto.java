package br.com.maoamiga.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Ponto {
  @Id @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  private String nome;
  private String endereco;
  private String bairro;
  private String horario;
  private String tipo;
  public Ponto() {}
  public Ponto(String nome, String endereco, String bairro, String horario, String tipo) {
    this.nome = nome; this.endereco = endereco; this.bairro = bairro; this.horario = horario; this.tipo = tipo;
  }
  public UUID getId() { return id; }
  public String getNome() { return nome; } public void setNome(String v) { nome = v; }
  public String getEndereco() { return endereco; } public void setEndereco(String v) { endereco = v; }
  public String getBairro() { return bairro; } public void setBairro(String v) { bairro = v; }
  public String getHorario() { return horario; } public void setHorario(String v) { horario = v; }
  public String getTipo() { return tipo; } public void setTipo(String v) { tipo = v; }
}
