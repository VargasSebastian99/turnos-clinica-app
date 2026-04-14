package com.cursocopilot.turnos_app.Security.annotations;
import java.lang.annotation.*;
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequirePermiso {
    String value();
}
//Esta anotación se pondrá en los endpoints
//ej: @RequirePermiso("crear_turno")