package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.CachePublicacao;
import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.Gostei;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Responses.ComentarioResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface PublicacaoRepository extends JpaRepository<Publicacao, Integer> {
    Page<Publicacao> findByTipoIsNotOrderByIdDesc(String tipo, Pageable pageable);

    Page<Publicacao> findByTipoIsIn(Collection<String> tipos, Pageable pageable);

    Page<Publicacao> findByTipoIs(String tipo, Pageable pageable);

    @Query("select p from Publicacao p where p.publicacaoPai = ?1 and p.tipo = ?2")
    Page<ComentarioResponse> findByPublicacaoPaiEqualsAndTipoEquals(Publicacao publicacaoPai, String tipo, Pageable pageable);

    @Query("select p from Publicacao p where p.evento is not null and p.publicacaoPai is null")
    List<Publicacao> findAllIdEventoNotNull();

    @Query("select p from Publicacao p where p.evento = ?1 and p.publicacaoPai is null")
    Optional<Publicacao> findEventoById(Evento evento);

    Page<Publicacao> findByUsuario_IdUsuarioIsAndTipoIsNot(Integer idUsuario, String tipo, Pageable pageable);
    
    @Query(value = "select * from Publicacao where fk_usuario=?1",nativeQuery = true)
    Page<Publicacao> findAllByFkUsario(int fkUsuario, Pageable pageable);

    Page<Publicacao> findByDescricaoLike(String descricao, Pageable pageable);

    Page<Publicacao> findByEvento_TituloContainsOrDescricaoContainsAndTipoEquals(String titulo, String descricao, String tipo, Pageable pageable);

    @Query("SELECT new br.com.voluntier.apivoluntier.Models.CachePublicacao(p.id, p.descricao, p.likes.size,p.pathImagem) FROM Publicacao p where p.tipo='evento'")
    List<CachePublicacao> findByPublicaoCache();

    @Query("select descricao from Publicacao where descricao like '%#%'")
    List<String> findByDescricaoContainingHash();
}
