package br.com.maoamiga.dto;
import jakarta.validation.constraints.*;

public record PontoRequestDTO(@NotBlank String nome, @NotBlank String endereco, @NotBlank String bairro,
                              @NotBlank String horario, @NotBlank @Pattern(regexp = "coleta|distribuição") String tipo) {}
