package br.com.maoamiga.controller;
import br.com.maoamiga.dto.*;
import br.com.maoamiga.service.DoacaoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController @RequestMapping("/api/v1/doacoes") @CrossOrigin(origins = "*")
public class DoacaoController {
  private final DoacaoService service;
  public DoacaoController(DoacaoService service) { this.service = service; }
  @GetMapping("/filtro") public Page<DoacaoResponseDTO> filtrar(@RequestParam(required = false) String filtro, @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC) Pageable pageable) { return service.buscar(filtro, pageable); }
  @GetMapping public Page<DoacaoResponseDTO> listar(@RequestParam(required = false) String filtro, @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC) Pageable pageable) { return service.buscar(filtro, pageable); }
  @GetMapping("/{id}") public DoacaoResponseDTO buscar(@PathVariable UUID id) { return service.buscarPorId(id); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public DoacaoResponseDTO cadastrar(@Valid @RequestBody DoacaoRequestDTO dto) { return service.salvar(dto); }
  @PutMapping("/{id}") public DoacaoResponseDTO atualizar(@PathVariable UUID id, @Valid @RequestBody DoacaoRequestDTO dto) { return service.atualizar(id, dto); }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable UUID id) { service.excluir(id); }
}
