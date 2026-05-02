package com.turnos_app.service;

import com.turnos_app.dto.ProfesionalResponseDTO;
import com.turnos_app.model.Especialidad;
import com.turnos_app.model.EstadoProfesional;
import com.turnos_app.model.Profesional;
import com.turnos_app.repository.EspecialidadRepository;
import com.turnos_app.repository.ProfesionalRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProfesionalService {

    private final ProfesionalRepository repository;
    private final EspecialidadRepository especialidadRepository;

    public ProfesionalService(ProfesionalRepository repository, EspecialidadRepository especialidadRepository){
        this.repository = repository;
        this.especialidadRepository = especialidadRepository;
    }
    public ProfesionalResponseDTO mapToDTO(Profesional p){
        return new ProfesionalResponseDTO(
                p.getId(),
                p.getNombre(),
                p.getEstado(),
                p.getEspecialidad().getId(),
                p.getEspecialidad().getNombre(),
                p.getHoraInicioManiana(),
                p.getHoraFinManiana(),
                p.getHoraInicioTarde(),
                p.getHoraFinTarde(),
               true,
               // p.getActivo(),
                p.getFechaBaja(),
                p.getFechaAlta(),
                p.getFechaModificacion()
        );
    }
    public List<ProfesionalResponseDTO> mapToDTOList(List<Profesional> profesionales){
        return profesionales.stream()
                .map(this::mapToDTO)
                .toList();
    }
    public List<ProfesionalResponseDTO> obtenerTodos(){

        return mapToDTOList(repository.findAll());
    }
    public Profesional obtenerPorId(Long id){
        return repository.findById(id).orElse(null);
    }
    public Profesional crear(Profesional profesional){
        if (profesional.getEspecialidad() != null){
            Long espId = profesional.getEspecialidad().getId();
            Especialidad esp = especialidadRepository.findById(espId).orElse(null);
            profesional.setEspecialidad(esp);
            profesional.setEstado(EstadoProfesional.ACTIVO);
        }
        return repository.save(profesional);
    }
    public Profesional actualizar(Long id, Profesional datos){
        Profesional existente = obtenerPorId(id);
        if (existente == null) return null;
        existente.setNombre(datos.getNombre());
        if(datos.getEspecialidad() != null){
            Long espId = datos.getEspecialidad().getId();
            Especialidad esp = especialidadRepository.findById(espId).orElse(null);
            existente.setEspecialidad(esp);
            existente.setEstado(datos.getEstado());
        }
        return repository.save(existente);
    }
    public boolean eliminar(Long id){
        Profesional p = obtenerPorId(id);
        if(p == null) return false;
        p.setEstado(EstadoProfesional.BAJA);
        p.setActivo(false);
        p.setFechaBaja(LocalDate.now());
        repository.save(p);
        return true;
    }
    public Page<Profesional> buscarProfesionales(
            String nombre,
            Long especialidadId,
            EstadoProfesional estado,
            Pageable pageable
    ){
        Specification<Profesional> spec = Specification.where(null);
        if(nombre != null && !nombre.isBlank()){
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("nombre")),"%" + nombre.toLowerCase() + "%"));
        }
        if(especialidadId != null){
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("especialidad").get("id"), especialidadId));
        }
        if(estado != null){
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("estado"), estado));
        }
        return repository.findAll(spec, pageable);
    }
}
