package br.com.maoamiga.dto;
import jakarta.validation.constraints.*;
public record DoacaoRequestDTO(@NotBlank String tipoItem, @NotNull @Positive Integer quantidade, @NotBlank String pontoDestino) {}
