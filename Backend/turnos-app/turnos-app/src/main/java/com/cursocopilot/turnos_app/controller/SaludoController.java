package com.cursocopilot.turnos_app.controller;

import com.cursocopilot.turnos_app.model.Saludo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaludoController {
    @GetMapping("/saludo/{nombre}")
    public Saludo saludar(@PathVariable String nombre){
        return new Saludo("Hola " + nombre +", bienvenido a Spring Boot!",nombre);
    }
}
