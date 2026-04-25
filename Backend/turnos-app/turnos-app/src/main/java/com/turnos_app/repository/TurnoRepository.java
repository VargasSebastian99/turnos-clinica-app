package com.turnos_app.repository;

import com.turnos_app.model.EstadoTurno;
import com.turnos_app.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long>, JpaSpecificationExecutor<Turno> {

    //obtener todos los turnos de un profesional
    List<Turno> findByProfesionalIdAndFecha(Long profesionalId, LocalDate fecha);
    //obtener turnos del cliente
    List<Turno> findByClienteIdAndFecha(Long clienteId, LocalDate fecha);
    List<Turno> findByActivoTrue();
    List<Turno> findByProfesionalIdAndFechaOrderByHoraAsc(Long profesionalId, LocalDate fecha);
    List<Turno> findByClienteIdOrderByFechaAscHoraAsc(Long clienteId);
    List<Turno> findByFechaGreaterThanEqualOrderByFechaAscHoraAsc(LocalDate fecha);
    //findByFechaGreaterThanEqual fecha >= hoy
    List<Turno> findByEstadoOrderByFechaAscHoraAsc(EstadoTurno estado);
    @Query("""
            select t from Turno t
            join fetch t.cliente
            join fetch t.profesional
            join fetch t.servicio
            """)
    List<Turno> findAllConRelaciones();
}
