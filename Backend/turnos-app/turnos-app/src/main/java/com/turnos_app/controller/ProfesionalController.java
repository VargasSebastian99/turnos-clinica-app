package com.turnos_app.controller;

import com.turnos_app.model.Profesional;
import com.turnos_app.service.ProfesionalService;
import jakarta.validation.Valid;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.turnos_app.security.annotations.RequirePermiso;
@RestController
@RequestMapping("/profesionales")
public class ProfesionalController {
    private final ProfesionalService service;
    public ProfesionalController(ProfesionalService service){
        this.service = service;
    }
    @RequirePermiso("ver_profesionales")
    @GetMapping
    public ResponseEntity<?> obtenerTodos(){

        return ResponseEntity.ok(service.obtenerTodos());
    }
    @RequirePermiso("ver_profesionales")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        Profesional profesional = service.obtenerPorId(id);
        if(profesional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profesional no encontrado");
        }
        return ResponseEntity.ok(service.mapToDTO(profesional));
    }
    @RequirePermiso("crear_profesional")
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Profesional profesional){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.crear(profesional));
    }
    @RequirePermiso("editar_profesional")
    @PutMapping("{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Profesional profesional){
        Profesional actualizado = service.actualizar(id, profesional);
        if(actualizado == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profesional no encontrado");
        }
        return ResponseEntity.ok(actualizado);
    }
    @RequirePermiso("eliminar_profesional")
    @DeleteMapping("{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        if(!service.eliminar(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profesional no encontrado");
        }
        return ResponseEntity.ok("Profesional eliminado");
    }
}
