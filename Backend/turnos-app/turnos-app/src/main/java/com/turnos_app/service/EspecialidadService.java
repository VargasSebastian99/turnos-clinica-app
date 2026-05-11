package com.turnos_app.service;

import com.turnos_app.model.Especialidad;
import com.turnos_app.repository.EspecialidadRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EspecialidadService {
    private final EspecialidadRepository repository;
    public EspecialidadService(EspecialidadRepository repository){
        this.repository = repository;
    }
    public List<Especialidad> obtenerTodas(){
        return repository.findAll();
    }
    public Especialidad obtenerPorId(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Especialidad no encontrada"));
    }
    public Especialidad crear(Especialidad especialidad){
        return repository.save(especialidad);
    }
    public Especialidad actualizar(Long id, Especialidad datos){

        Especialidad existe = repository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Especialidad no encontrada"));
        existe.setNombre(datos.getNombre());
        return repository.save(existe);
    }
    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Especialidad no encontrada");
        } else{
            Especialidad e = obtenerPorId(id);
            e.setActivo(false);
            e.setFechaBaja(LocalDate.now());
            repository.save(e);
        }
    }
}
