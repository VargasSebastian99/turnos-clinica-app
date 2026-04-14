package com.cursocopilot.turnos_app.service;

import com.cursocopilot.turnos_app.model.Cliente;
import com.cursocopilot.turnos_app.repository.ClienteRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository){
        this.repository = repository;
    }

    public List<Cliente> obtenerTodos(){
        return repository.findAll();
    }
    public Cliente obtenerPorId(Long id){
        return repository.findById(id).orElse(null);
    }
    public Cliente crear(Cliente cliente){
        return repository.save(cliente);
    }
    public Cliente actualizar(Long id, Cliente datos) {
        Cliente existente = obtenerPorId(id);
        if (existente == null) return null;
        existente.setNombre(datos.getNombre());
        existente.setEmail(datos.getEmail());
        existente.setTelefono(datos.getTelefono());
        return repository.save(existente);
    }
    public boolean eliminar(Long id){
        Cliente c = obtenerPorId(id);
        if (c == null) return false;
        c.setActivo(false);
        c.setFechaBaja(LocalDate.now());
        repository.save(c);
        return true;
    }
    public Optional<Cliente> buscarPorEmail(String email){
        return repository.findByEmail(email);
    }
    public List<Cliente> buscarPorNombre(String nombre){
        return repository.findByNombreContainingIgnoreCase(nombre);
    }
    public boolean existeEmail(String email){
        return repository.existsByEmail(email);
    }
}
