package br.com.maoamiga.service;
import br.com.maoamiga.dto.*;
import br.com.maoamiga.entity.Ponto;
import br.com.maoamiga.repository.PontoRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class PontoService {
  private final PontoRepository repository;
  public PontoService(PontoRepository repository) { this.repository = repository; }
  public Page<PontoResponseDTO> buscar(String filtro, Pageable pageable) { return repository.buscar(filtro, pageable).map(PontoResponseDTO::from); }
  public PontoResponseDTO buscarPorId(UUID id) { return repository.findById(id).map(PontoResponseDTO::from).orElseThrow(() -> new IllegalArgumentException("Ponto não encontrado")); }
  public PontoResponseDTO salvar(PontoRequestDTO dto) { return PontoResponseDTO.from(repository.save(new Ponto(dto.nome(), dto.endereco(), dto.bairro(), dto.horario(), dto.tipo()))); }
  public PontoResponseDTO atualizar(UUID id, PontoRequestDTO dto) {
    Ponto p = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Ponto não encontrado"));
    p.setNome(dto.nome()); p.setEndereco(dto.endereco()); p.setBairro(dto.bairro()); p.setHorario(dto.horario()); p.setTipo(dto.tipo());
    return PontoResponseDTO.from(repository.save(p));
  }
  public void excluir(UUID id) { if (!repository.existsById(id)) throw new IllegalArgumentException("Ponto não encontrado"); repository.deleteById(id); }
}
