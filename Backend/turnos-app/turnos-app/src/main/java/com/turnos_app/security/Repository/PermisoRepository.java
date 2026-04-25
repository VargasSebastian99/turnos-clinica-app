package com.turnos_app.security.Repository;

import com.turnos_app.security.Model.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermisoRepository extends JpaRepository<Permiso,Long> {
    Optional<Permiso> findByNombre(String nombre);
}
