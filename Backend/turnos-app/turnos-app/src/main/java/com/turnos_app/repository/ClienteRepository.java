package com.turnos_app.repository;

import com.turnos_app.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> , JpaSpecificationExecutor<Cliente> {

    Optional<Cliente> findByEmail(String email);
    List<Cliente> findByNombreContainingIgnoreCase(String nombre);
    List<Cliente> findByActivoTrue();
    boolean existsByEmail(String email);
}

/***
 * spring genera automáticamente:
 * findAll()
 * findById()
 * save()
 * deleteById()
 * existeById()
 * y más
 */
