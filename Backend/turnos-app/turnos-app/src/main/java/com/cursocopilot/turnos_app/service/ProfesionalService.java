package com.cursocopilot.turnos_app.service;

import com.cursocopilot.turnos_app.model.Especialidad;
import com.cursocopilot.turnos_app.model.EstadoProfesional;
import com.cursocopilot.turnos_app.model.Profesional;
import com.cursocopilot.turnos_app.repository.EspecialidadRepository;
import com.cursocopilot.turnos_app.repository.ProfesionalRepository;
import org.springframework.stereotype.Service;

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
    public List<Profesional> obtenerTodos(){
        return repository.findAll();
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
}
