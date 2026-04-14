package com.cursocopilot.turnos_app.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@Data
@AllArgsConstructor
public class Saludo {
    private String mensaje;
    private String nombre;

}


