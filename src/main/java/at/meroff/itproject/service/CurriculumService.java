package at.meroff.itproject.service;

import at.meroff.itproject.domain.Curriculum;
import at.meroff.itproject.repository.CurriculumRepository;
import at.meroff.itproject.repository.search.CurriculumSearchRepository;
import at.meroff.itproject.service.dto.CurriculumDTO;
import at.meroff.itproject.service.mapper.CurriculumMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Curriculum.
 */
@Service
@Transactional
public class CurriculumService {

    private final Logger log = LoggerFactory.getLogger(CurriculumService.class);

    private final CurriculumRepository curriculumRepository;
    private final CurriculumMapper curriculumMapper;
    private final CurriculumSearchRepository curriculumSearchRepository;

    public CurriculumService(CurriculumRepository curriculumRepository,
                             CurriculumMapper curriculumMapper,
                             CurriculumSearchRepository curriculumSearchRepository) {
        this.curriculumRepository = curriculumRepository;
        this.curriculumMapper = curriculumMapper;
        this.curriculumSearchRepository = curriculumSearchRepository;
    }

    /**
     * Save a curriculum.
     *
     * @param curriculumDTO the entity to save
     * @return the persisted entity
     */
    public CurriculumDTO save(CurriculumDTO curriculumDTO) {
        log.debug("Request to save Curriculum : {}", curriculumDTO);
        Curriculum curriculum = curriculumMapper.toEntity(curriculumDTO);
        curriculum = curriculumRepository.save(curriculum);
        CurriculumDTO result = curriculumMapper.toDto(curriculum);
        curriculumSearchRepository.save(curriculum);
        return result;
    }

    /**
     *  Get all the curricula.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CurriculumDTO> findAll() {
        log.debug("Request to get all Curricula");
        return curriculumRepository.findAllWithEagerRelationships().stream()
            .map(curriculumMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one curriculum by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public CurriculumDTO findOne(Long id) {
        log.debug("Request to get Curriculum : {}", id);
        Curriculum curriculum = curriculumRepository.findOneWithEagerRelationships(id);
        return curriculumMapper.toDto(curriculum);
    }

    /**
     *  Get one curriculum by id.
     *
     *  @param curId the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public CurriculumDTO findByCurId(Integer curId) {
        log.debug("Request to get Curriculum : {}", curId);
        Curriculum curriculum = curriculumRepository.findByCurId(curId);
        return curriculumMapper.toDto(curriculum);
    }

    /**
     *  Delete the  curriculum by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Curriculum : {}", id);
        curriculumRepository.delete(id);
        curriculumSearchRepository.delete(id);
    }

    /**
     * Search for the curriculum corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CurriculumDTO> search(String query) {
        log.debug("Request to search Curricula for query {}", query);
        return StreamSupport
            .stream(curriculumSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(curriculumMapper::toDto)
            .collect(Collectors.toList());
    }
}
