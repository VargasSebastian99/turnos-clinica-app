package com.turnos_app.dto;

import com.turnos_app.model.EstadoProfesional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record ProfesionalResponseDTO(
        Long id,
        String nombre,
        EstadoProfesional estado,
        Long especialidadId,
        String especialidadNombre,
        LocalTime horaInicioManiana,
        LocalTime horaFinManiana,
        LocalTime horaInicioTarde,
        LocalTime horaFinTarde,
        Boolean activo,
        LocalDate fechaBaja,
        LocalDateTime fechaAlta,
        LocalDateTime fechaModificacion

) {

}
