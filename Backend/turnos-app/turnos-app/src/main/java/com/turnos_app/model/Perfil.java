package com.turnos_app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@Data // Genera getters, setters, toString, equals y hashcode
@AllArgsConstructor // Genera constructor con todos los argumentos
public class Perfil {
    private String nombre;
    private String nivel;
}
//Controlador REST
@RestController
class PerfilController{
    @GetMapping("/mi-perfil")
    public Perfil obtenerPerfil(){
        //Devuelve un objeto que Spring Boot serializa automáticamente a JSON
        return new Perfil("Sebastián", "Intermedio");
    }
}

