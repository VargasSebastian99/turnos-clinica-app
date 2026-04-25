package com.turnos_app.dto;

import com.turnos_app.model.EstadoTurno;

import java.time.LocalDate;
import java.time.LocalTime;

public record TurnoResponseDTO (
    Long id,
    LocalDate fecha,
    LocalTime hora,
    EstadoTurno estado,
    Long clienteId,
    String clienteNombre,
    String clienteEmail,
    String clienteTelefono,
    Long profesionalId,
    String profesionalNombre,
    Long servicioId,
    String servicioNombre,
    int duracion

){}

