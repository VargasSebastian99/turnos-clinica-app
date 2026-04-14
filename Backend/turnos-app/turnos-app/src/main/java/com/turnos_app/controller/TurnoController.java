package com.cursocopilot.turnos_app.controller;

import com.cursocopilot.turnos_app.Security.annotations.RequirePermiso;
import com.cursocopilot.turnos_app.model.EstadoTurno;
import com.cursocopilot.turnos_app.model.Turno;
import com.cursocopilot.turnos_app.service.TurnoService;
import jakarta.validation.Valid;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
    private final TurnoService service;

    public TurnoController(TurnoService service){
        this.service = service;
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        Turno turno = service.obtenerPorId(id);
        if(turno == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Turno no encontrado");
        }
        return ResponseEntity.ok(turno);
    }
    @RequirePermiso("crear_turno")
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Turno turno){
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(service.crear(turno));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Turno turno){
        Turno actualizado = service.actualizar(id, turno);
        if (actualizado == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Turno no encontrado");
        }
        return ResponseEntity.ok(actualizado);
    }
    @PutMapping("/{id}/reactivar")
    public ResponseEntity<?> reactivar(@PathVariable Long id){
        try{
            boolean ok = service.reactivar(id);
            if(!ok) return ResponseEntity.notFound().build();
            return ResponseEntity.ok("Turno reactivado correctamente");
        }catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        if(!service.eliminar(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Turno no encontrado");
        }
        return ResponseEntity.ok("Turno eliminado");
    }
    @GetMapping("/profesional/{id}/dia/{fecha}")
    public ResponseEntity<?> obtenerAgendaDiaria(
            @PathVariable Long id,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha
    ){
        List<Turno> turnos = service.obtenerAgendaDiaria(id, fecha);
        if(turnos.isEmpty()){
            return ResponseEntity.ok("El profesional no tiene turnos para esta fecha");
        }
        return ResponseEntity.ok(turnos);
    }
    @GetMapping("/cliente/{id}")
    public ResponseEntity<?> obtenerTurnosPorCliente(@PathVariable Long id){
        List<Turno> turnos = service.obtenerTurnosPorCliente(id);
        if(turnos.isEmpty()){
            return ResponseEntity.ok("El cliente no tiene turnos registrados");
        }
        return ResponseEntity.ok(turnos);
    }
    @GetMapping("/futuros")
    public ResponseEntity<?> obtenerTurnosFuturos(){
        List<Turno> turnos = service.obtenerTurnosFuturos();
        if(turnos.isEmpty()){
            return ResponseEntity.ok("No hay turnos futuros");
        }
        return ResponseEntity.ok(turnos);
    }
    @GetMapping("/estado/{estado}")
    public ResponseEntity<?> obtenerTurnosCancelados(@PathVariable EstadoTurno estado){
        List<Turno> turnos = service.obtenerTurnosCancelados(estado);
        if(turnos.isEmpty()){
            return ResponseEntity.ok("No hay turnos con estado " + estado);
        }
        return ResponseEntity.ok(turnos);
    }
    @GetMapping
    public ResponseEntity<?> buscarTurnos(
            @RequestParam(required = false) EstadoTurno estado,
            @RequestParam(required = false) Long profesionalId,
            @RequestParam(required = false) Long clienteId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        Page<Turno> turnos = service.buscarTurnos(estado,profesionalId, clienteId,desde,hasta, pageable);
        if(turnos.isEmpty()){
            return ResponseEntity.ok("No se encontraron turnos");
        }
        return ResponseEntity.ok(turnos);
    }
}
