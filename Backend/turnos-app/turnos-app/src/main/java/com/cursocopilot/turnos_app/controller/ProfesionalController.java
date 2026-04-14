package com.cursocopilot.turnos_app.controller;

import com.cursocopilot.turnos_app.model.Profesional;
import com.cursocopilot.turnos_app.service.ProfesionalService;
import jakarta.validation.Valid;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profesionales")
public class ProfesionalController {
    private final ProfesionalService service;
    public ProfesionalController(ProfesionalService service){
        this.service = service;
    }
    @GetMapping
    public ResponseEntity<List<Profesional>> obtenerTodos(){
        return ResponseEntity.ok(service.obtenerTodos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        Profesional profesional = service.obtenerPorId(id);
        if(profesional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profesional no encontrado");
        }
        return ResponseEntity.ok(profesional);
    }
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Profesional profesional){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.crear(profesional));
    }
    @PutMapping("{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Profesional profesional){
        Profesional actualizado = service.actualizar(id, profesional);
        if(actualizado == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profesional no encontrado");
        }
        return ResponseEntity.ok(actualizado);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        if(!service.eliminar(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profesional no encontrado");
        }
        return ResponseEntity.ok("Profesional eliminado");
    }
}
