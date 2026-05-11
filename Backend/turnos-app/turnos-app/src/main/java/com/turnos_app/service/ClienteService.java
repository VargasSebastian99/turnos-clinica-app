package com.turnos_app.service;

import com.turnos_app.model.Cliente;
import com.turnos_app.repository.ClienteRepository;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

        return repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
    }
    public Cliente crear(Cliente cliente){
        return repository.save(cliente);
    }
    public Cliente actualizar(Long id, Cliente datos) {
        Cliente existente = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
        existente.setNombre(datos.getNombre());
        existente.setEmail(datos.getEmail());
        existente.setTelefono(datos.getTelefono());
        return repository.save(existente);
    }
    public void eliminar(Long id){
        if(!repository.existsById(id)){
            throw new IllegalArgumentException("Cliente no encontrado");
        }else {
            Cliente c = obtenerPorId(id);
            c.setActivo(false);
            c.setFechaBaja(LocalDate.now());
            repository.save(c);

        }
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
    public Page<Cliente> buscarClientes(String nombre, String email, Pageable pageable){
        Specification<Cliente> spec = Specification.where(null);
        if(nombre != null && !nombre.isBlank()){
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("nombre")), "%" + nombre.toLowerCase() + "%"));
        }
        if(email != null && !email.isBlank()){
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"));
        }
        return repository.findAll(spec, pageable);
    }
}
