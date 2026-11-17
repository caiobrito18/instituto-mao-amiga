package br.com.maoamiga.repository;
import br.com.maoamiga.entity.Doacao;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.UUID;

public interface DoacaoRepository extends JpaRepository<Doacao, UUID> {
  @Query("select d from Doacao d where :filtro is null or :filtro = '' or lower(d.tipoItem) like lower(concat('%', :filtro, '%'))")
  Page<Doacao> buscar(@Param("filtro") String filtro, Pageable pageable);
}
