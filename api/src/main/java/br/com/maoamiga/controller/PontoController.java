package br.com.maoamiga.controller;
import br.com.maoamiga.dto.*;
import br.com.maoamiga.service.PontoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController @RequestMapping("/api/v1/pontos") @CrossOrigin(origins = "*")
public class PontoController {
  private final PontoService service;
  public PontoController(PontoService service) { this.service = service; }
  @GetMapping public Page<PontoResponseDTO> listar(@RequestParam(required = false) String filtro, @PageableDefault(size = 10, sort = "nome") Pageable pageable) { return service.buscar(filtro, pageable); }
  @GetMapping("/filtro") public Page<PontoResponseDTO> filtrar(@RequestParam(required = false) String filtro, @PageableDefault(size = 10, sort = "nome") Pageable pageable) { return service.buscar(filtro, pageable); }
  @GetMapping("/{id}") public PontoResponseDTO buscar(@PathVariable UUID id) { return service.buscarPorId(id); }
  @PostMapping public PontoResponseDTO cadastrar(@Valid @RequestBody PontoRequestDTO dto) { return service.salvar(dto); }
  @PutMapping("/{id}") public PontoResponseDTO atualizar(@PathVariable UUID id, @Valid @RequestBody PontoRequestDTO dto) { return service.atualizar(id, dto); }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable UUID id) { service.excluir(id); }
}
