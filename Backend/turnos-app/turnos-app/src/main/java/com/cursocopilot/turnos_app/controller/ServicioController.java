package com.cursocopilot.turnos_app.controller;

import com.cursocopilot.turnos_app.model.Servicio;
import com.cursocopilot.turnos_app.service.ServicioService;
import jakarta.validation.Valid;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicios")
public class ServicioController {
    private final ServicioService service;
    public ServicioController(ServicioService service){
        this.service = service;
    }
    @GetMapping
    public ResponseEntity<List<Servicio>> obtenerTodos(){
        return ResponseEntity.ok(service.obtenerTodos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        Servicio servicio = service.obtenerPorId(id);
        if(servicio == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Servicio no encontrado");
        }
        return ResponseEntity.ok(servicio);
    }
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Servicio servicio){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.crear(servicio));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Servicio servicio){
        Servicio actualizado = service.actualizar(id, servicio);
        if(actualizado == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Servicio no encontrado");
        }
        return ResponseEntity.ok(actualizado);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        if(!service.eliminar(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Servicio no encontrado");
        }
        return ResponseEntity.ok("Servicio eliminado");
    }
}
