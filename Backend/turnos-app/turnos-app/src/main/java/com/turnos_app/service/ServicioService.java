package com.turnos_app.service;

import com.turnos_app.dto.ServicioResponseDTO;
import com.turnos_app.model.Especialidad;
import com.turnos_app.model.Servicio;
import com.turnos_app.repository.ServicioRepository;
import com.turnos_app.repository.EspecialidadRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServicioService {
    private final ServicioRepository repository;
    private final EspecialidadRepository especialidadRepository;

    public ServicioService(ServicioRepository repository, EspecialidadRepository especialidadRepository){

        this.repository = repository;
        this.especialidadRepository = especialidadRepository;
    }
    public ServicioResponseDTO mapToDTO(Servicio s){
        return new ServicioResponseDTO(
            s.getId(),
            s.getNombre(),
            s.getDuracionMinutos(),
            s.getFechaBaja(),
            s.getEspecialidad().getId(),
            s.getEspecialidad().getNombre(),
            s.getFechaAlta(),
            s.getFechaModifiacion()
        );
    }
    public List<ServicioResponseDTO> mapToDTOList(List<Servicio> servicios){
        return servicios.stream()
                .map(this::mapToDTO)
                .toList();
    }
    public List<ServicioResponseDTO> obtenerTodos(){

        return mapToDTOList(repository.findAll());
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
        if(datos.getEspecialidad() != null) {
            Long espId = datos.getEspecialidad().getId();
            Especialidad esp = especialidadRepository.findById(espId).orElse(null);
            existente.setEspecialidad(esp);
        }
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
