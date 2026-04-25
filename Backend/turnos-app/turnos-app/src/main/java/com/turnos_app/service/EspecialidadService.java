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
        return repository.findById(id).orElse(null);
    }
    public Especialidad crear(Especialidad especialidad){
        return repository.save(especialidad);
    }
    public Especialidad actualizar(Long id, Especialidad datos){
        Especialidad existe = obtenerPorId(id);
        if (existe == null) return null;
        existe.setNombre(datos.getNombre());
        return repository.save(existe);
    }
    public boolean eliminar(Long id){
        Especialidad e = obtenerPorId(id);
        if(e == null) return false;
        e.setActivo(false);
        e.setFechaBaja(LocalDate.now());
        repository.save(e);
        return true;
    }
}
