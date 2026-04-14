package com.cursocopilot.turnos_app.repository;

import com.cursocopilot.turnos_app.model.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EspecialidadRepository extends JpaRepository<Especialidad,Long> {
    List<Especialidad> findByActivoTrue();
}
