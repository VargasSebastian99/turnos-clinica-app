package com.turnos_app.controller;

import com.turnos_app.model.Cliente;
import com.turnos_app.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.turnos_app.security.annotations.RequirePermiso;
@RestController
@RequestMapping("/clientes")

public class ClienteController {
    private final ClienteService service;
    public ClienteController(ClienteService service){
        this.service = service;
    }
    @RequirePermiso("ver_clientes")
    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodos(){
        return ResponseEntity.ok(service.obtenerTodos());
    }
    @RequirePermiso("ver_clientes")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        Cliente cliente = service.obtenerPorId(id);
        if (cliente == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cliente no encontrado");
        }
        return ResponseEntity.ok(cliente);
    }
    @RequirePermiso("crear_cliente")
    @PostMapping
    public ResponseEntity<Cliente> crear(@Valid @RequestBody Cliente cliente){
        Cliente creado = service.crear(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }
    @RequirePermiso("editar_cliente")
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,@Valid @RequestBody Cliente cliente){
        Cliente actualizado = service.actualizar(id, cliente);
        if(actualizado == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("cliente no encontrado");
        }
        return ResponseEntity.ok(actualizado);
    }
    @RequirePermiso("eliminar_cliente")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        boolean eliminado = service.eliminar(id);
        if(!eliminado){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cliente no encontrado");
        }
        return ResponseEntity.ok("Cliente eliminado");
    }
    @RequirePermiso("ver_clientes")
    @GetMapping("/email")
    public ResponseEntity<?> buscarPorEmail(@RequestParam String valor){
        return service.buscarPorEmail(valor)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("No existe un cliente con ese mail"));
    }
    @RequirePermiso("ver_clientes")
    @GetMapping("/buscar")
    public ResponseEntity<List<Cliente>> buscarPorNombre(@RequestParam String nombre){
        return ResponseEntity.ok(service.buscarPorNombre(nombre));
    }
    //verificar si un email existe
    @RequirePermiso("ver_clientes")
    @GetMapping("/existe-mail")
    public ResponseEntity<Boolean> existeEmail(@RequestParam String email){
        return ResponseEntity.ok(service.existeEmail(email));
    }
}
