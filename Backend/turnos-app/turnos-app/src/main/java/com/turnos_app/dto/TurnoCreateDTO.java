package com.turnos_app.dto;
import java.time.LocalDate;
import java.time.LocalTime;
public record TurnoCreateDTO (
    Long clienteId,
    Long profesionalId,
    Long servicioId,
    LocalDate fecha,
    LocalTime hora
){}
