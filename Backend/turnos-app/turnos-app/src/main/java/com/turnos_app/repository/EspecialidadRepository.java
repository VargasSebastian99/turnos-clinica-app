package com.turnos_app.repository;

import com.turnos_app.model.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EspecialidadRepository extends JpaRepository<Especialidad,Long> {
    List<Especialidad> findByActivoTrue();
}
