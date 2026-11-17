package br.com.maoamiga.repository;
import br.com.maoamiga.entity.Ponto;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.UUID;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {
  @Query("select p from Ponto p where :filtro is null or :filtro = '' or lower(p.nome) like lower(concat('%', :filtro, '%')) or lower(p.bairro) like lower(concat('%', :filtro, '%'))")
  Page<Ponto> buscar(@Param("filtro") String filtro, Pageable pageable);
}
