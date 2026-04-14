package com.cursocopilot.turnos_app.Security.exceptions;
// no autorizado 401
public class UnauthorizedException extends RuntimeException{
    public UnauthorizedException(String message){
        super(message);
    }
}
