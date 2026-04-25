package com.turnos_app.security.exceptions;
//Recurso no encontrado 404
public class NotFoundException extends RuntimeException{
    public NotFoundException(String message){
        super(message);
    }
}
