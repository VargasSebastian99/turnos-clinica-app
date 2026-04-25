package com.turnos_app.security.exceptions;
// no autorizado 401
public class UnauthorizedException extends RuntimeException{
    public UnauthorizedException(String message){
        super(message);
    }
}
