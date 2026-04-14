package com.cursocopilot.turnos_app.Security.Repository;

import com.cursocopilot.turnos_app.Security.Model.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermisoRepository extends JpaRepository<Permiso,Long> {
    Optional<Permiso> findByNombre(String nombre);
}
