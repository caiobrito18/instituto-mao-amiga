package br.com.maoamiga.config;
import br.com.maoamiga.entity.Ponto;
import br.com.maoamiga.repository.PontoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.stream.IntStream;

@Configuration
public class DataInitializer {
  @Bean CommandLineRunner seed(PontoRepository repository) {
    return args -> { if (repository.count() == 0) IntStream.rangeClosed(1, 25).mapToObj(i ->
      new Ponto("Ponto Mão Amiga " + i, "Rua Solidária, " + (100 + i), i % 2 == 0 ? "Setor Bueno" : "Setor Campinas",
        "Seg a Sex, 8h às 17h", i % 3 == 0 ? "distribuição" : "coleta")).forEach(repository::save); };
  }
}
