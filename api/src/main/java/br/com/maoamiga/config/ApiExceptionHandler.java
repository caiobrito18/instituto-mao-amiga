package br.com.maoamiga.config;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(IllegalArgumentException.class)
  ResponseEntity<Map<String, String>> notFound(IllegalArgumentException e) { return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", e.getMessage())); }
  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<Map<String, String>> invalid(MethodArgumentNotValidException e) { return ResponseEntity.badRequest().body(Map.of("erro", "Dados inválidos")); }
}
