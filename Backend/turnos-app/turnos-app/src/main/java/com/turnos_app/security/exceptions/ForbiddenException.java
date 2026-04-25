package com.turnos_app.security.exceptions;
//sin permiso 403
public class ForbiddenException extends RuntimeException{
    public ForbiddenException(String message){
        super(message);
    }
}
