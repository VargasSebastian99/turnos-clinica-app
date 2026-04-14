package com.cursocopilot.turnos_app.Security.exceptions;
//sin permiso 403
public class ForbiddenException extends RuntimeException{
    public ForbiddenException(String message){
        super(message);
    }
}
