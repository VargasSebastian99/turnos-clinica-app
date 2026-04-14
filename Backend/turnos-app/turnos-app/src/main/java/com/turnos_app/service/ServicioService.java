package com.cursocopilot.turnos_app.service;

import com.cursocopilot.turnos_app.model.Servicio;
import com.cursocopilot.turnos_app.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServicioService {
    private final ServicioRepository repository;

    public ServicioService(ServicioRepository repository){
        this.repository = repository;
    }
    public List<Servicio> obtenerTodos(){
        return repository.findAll();
    }
    public Servicio obtenerPorId(Long id){
        return repository.findById(id).orElse(null);
    }
    public Servicio crear(Servicio servicio){
        return repository.save(servicio);
    }
    public Servicio actualizar(Long id, Servicio datos){
        Servicio existente = obtenerPorId(id);
        if(existente == null) return null;
        existente.setNombre(datos.getNombre());
        existente.setDuracionMinutos(datos.getDuracionMinutos());
        return repository.save(existente);
    }
    public boolean eliminar(Long id){
        Servicio s = obtenerPorId(id);
        if(s == null) return false;
        s.setActivo(false);
        s.setFechaBaja(LocalDate.now());
        repository.save(s);
        return true;
    }
}
