package com.turnos_app.controller;

import com.turnos_app.dto.ServicioResponseDTO;
import com.turnos_app.model.Servicio;
import com.turnos_app.service.ServicioService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.turnos_app.security.annotations.RequirePermiso;



@RestController
@RequestMapping("/servicios")
public class ServicioController {
    private final ServicioService service;
    public ServicioController(ServicioService service){
        this.service = service;
    }
    @RequirePermiso("ver_servicios")
    @GetMapping
    public ResponseEntity<?> obtenerTodos(){
        return ResponseEntity.ok(service.obtenerTodos());
    }
    @RequirePermiso("ver_servicios")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        Servicio servicio = service.obtenerPorId(id);
        if(servicio == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Servicio no encontrado");
        }
        return ResponseEntity.ok(service.mapToDTO(servicio));
    }
    @RequirePermiso("crear_servicio")
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Servicio servicio){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.crear(servicio));
    }
    @RequirePermiso("editar_servicio")
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Servicio servicio){
        Servicio actualizado = service.actualizar(id, servicio);
        if(actualizado == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Servicio no encontrado");
        }
        return ResponseEntity.ok(actualizado);
    }
    @RequirePermiso("eliminar_servicio")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        if(!service.eliminar(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Servicio no encontrado");
        }
        return ResponseEntity.ok("Servicio eliminado");
    }
    @RequirePermiso("ver_servicios")
    @GetMapping("/buscar")
    public ResponseEntity<Page<ServicioResponseDTO>> buscarServicios(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Long especialidadId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        Page<Servicio> servicios = service.buscarServicios(
                nombre,
                especialidadId,
                pageable
        );
        Page<ServicioResponseDTO> dtoServicio = servicios.map(service::mapToDTO);
        return ResponseEntity.ok(dtoServicio);
    }
}
