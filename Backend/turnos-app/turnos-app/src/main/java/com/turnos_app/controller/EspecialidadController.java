package com.turnos_app.controller;

import com.turnos_app.model.Especialidad;
import com.turnos_app.service.EspecialidadService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.turnos_app.security.annotations.RequirePermiso;
@RestController
@RequestMapping("/especialidades")
public class EspecialidadController {
    private final EspecialidadService service;
    public EspecialidadController(EspecialidadService service){
        this.service = service;
    }
    @RequirePermiso("ver_especialidades")
    @GetMapping
    public ResponseEntity<List<Especialidad>> obtenerTodas(){
        return ResponseEntity.ok(service.obtenerTodas());
    }
    @RequirePermiso("ver_especialidades")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        Especialidad esp = service.obtenerPorId(id);
        if(esp == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especialidad no encontrada");
        }
        return ResponseEntity.ok(esp);
    }
    @RequirePermiso("crear_especialidad")
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Especialidad especialidad){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.crear(especialidad));
    }
    @RequirePermiso("editar_especialidad")
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Especialidad especialidad){
        Especialidad actualizada = service.actualizar(id, especialidad);
        if(actualizada == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especialidad no encontrada");
        }
        return ResponseEntity.ok(actualizada);
    }
    @RequirePermiso("eliminar_especialidad")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        if(!service.eliminar(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especialidad no encontrada");
        }
        return ResponseEntity.ok("Especialidad eliminada");
    }
}
