package br.com.maoamiga.service;
import br.com.maoamiga.dto.*;
import br.com.maoamiga.entity.Doacao;
import br.com.maoamiga.repository.DoacaoRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class DoacaoService {
  private final DoacaoRepository repository;
  public DoacaoService(DoacaoRepository repository) { this.repository = repository; }
  public Page<DoacaoResponseDTO> buscar(String filtro, Pageable pageable) { return repository.buscar(filtro, pageable).map(DoacaoResponseDTO::from); }
  public DoacaoResponseDTO buscarPorId(UUID id) { return repository.findById(id).map(DoacaoResponseDTO::from).orElseThrow(() -> new IllegalArgumentException("Doação não encontrada")); }
  public DoacaoResponseDTO salvar(DoacaoRequestDTO dto) { Doacao d = new Doacao(); preencher(d, dto); d.setCriadoEm(LocalDateTime.now()); return DoacaoResponseDTO.from(repository.save(d)); }
  public DoacaoResponseDTO atualizar(UUID id, DoacaoRequestDTO dto) {
    Doacao d = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Doação não encontrada"));
    preencher(d, dto); return DoacaoResponseDTO.from(repository.save(d));
  }
  public void excluir(UUID id) { if (!repository.existsById(id)) throw new IllegalArgumentException("Doação não encontrada"); repository.deleteById(id); }
  private void preencher(Doacao d, DoacaoRequestDTO dto) { d.setTipoItem(dto.tipoItem()); d.setQuantidade(dto.quantidade()); d.setPontoDestino(dto.pontoDestino()); }
}
