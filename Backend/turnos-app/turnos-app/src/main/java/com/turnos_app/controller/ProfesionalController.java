package com.turnos_app.controller;

import com.turnos_app.dto.ProfesionalResponseDTO;
import com.turnos_app.model.EstadoProfesional;
import com.turnos_app.model.Profesional;
import com.turnos_app.service.ProfesionalService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.data.domain.PageRequest;
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
    @RequirePermiso("ver_profesionales")
    @GetMapping("/buscar")
    public ResponseEntity<Page<ProfesionalResponseDTO>> buscarProfesionales(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Long especialidadId,
            @RequestParam(required = false)EstadoProfesional estado,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
            ){
        Pageable pageable = PageRequest.of(page, size);
        Page<Profesional> profesionales = service.buscarProfesionales(
                nombre,
                especialidadId,
                estado,
                pageable
        );
        Page<ProfesionalResponseDTO> dtoPage = profesionales.map(service::mapToDTO);
        return ResponseEntity.ok(dtoPage);
    }
}
