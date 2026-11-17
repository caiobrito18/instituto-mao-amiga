package br.com.maoamiga.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Doacao {
  @Id @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  private String tipoItem;
  private Integer quantidade;
  private String pontoDestino;
  private LocalDateTime criadoEm;
  public UUID getId() { return id; }
  public String getTipoItem() { return tipoItem; } public void setTipoItem(String v) { tipoItem = v; }
  public Integer getQuantidade() { return quantidade; } public void setQuantidade(Integer v) { quantidade = v; }
  public String getPontoDestino() { return pontoDestino; } public void setPontoDestino(String v) { pontoDestino = v; }
  public LocalDateTime getCriadoEm() { return criadoEm; } public void setCriadoEm(LocalDateTime v) { criadoEm = v; }
}
