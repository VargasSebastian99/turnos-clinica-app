package com.turnos_app.repository;

import com.turnos_app.model.EstadoProfesional;
import com.turnos_app.model.Profesional;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProfesionalRepository extends  JpaRepository<Profesional, Long>, JpaSpecificationExecutor<Profesional> {
    List<Profesional> findByActivoTrue();
}
