package com.turnos_app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ServicioResponseDTO(
        Long id,
        String nombre,
        int duracionMinutos,
        LocalDate fechaBaja,
        Long especialidadId,
        String especialidadNombre,
        LocalDateTime fechaAlta,
        LocalDateTime fechaModificacion
) {
}
