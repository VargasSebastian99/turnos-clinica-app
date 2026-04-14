package com.cursocopilot.turnos_app.repository;

import com.cursocopilot.turnos_app.model.Profesional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfesionalRepository extends  JpaRepository<Profesional, Long>{
    List<Profesional> findByActivoTrue();
}
