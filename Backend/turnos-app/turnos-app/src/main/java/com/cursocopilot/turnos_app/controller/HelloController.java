package com.cursocopilot.turnos_app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HelloController {
    @GetMapping("/hola")
    public String hola() {
        return "Bienvenido a tu primera API con Spring Boot";
    }
}
