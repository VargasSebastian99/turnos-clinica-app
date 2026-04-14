package com.cursocopilot.turnos_app.repository;

import com.cursocopilot.turnos_app.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicioRepository extends JpaRepository<Servicio, Long>{
    List<Servicio> findByActivoTrue();
}
