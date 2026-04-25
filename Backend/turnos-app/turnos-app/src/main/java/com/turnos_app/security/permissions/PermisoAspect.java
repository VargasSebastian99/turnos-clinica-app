package com.turnos_app.security.permissions;
import com.turnos_app.security.annotations.RequirePermiso;
import com.turnos_app.security.exceptions.ForbiddenException;
import com.turnos_app.security.exceptions.UnauthorizedException;
import io.jsonwebtoken.Claims;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.util.List;
@Aspect
@Component
public class PermisoAspect {
    @Before("@annotation(requirePermiso)")
    public void validarPermiso(JoinPoint joinPoint, RequirePermiso requirePermiso){
        String permisoRequerido = requirePermiso.value();
        //obtener usuario autenticado
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getAuthorities() == null){
            throw new UnauthorizedException("No autenticado");
        }
        //obtener permisos desde los authorities
        List<String> permisosUsuario = auth.getAuthorities()
                .stream()
                .map(a -> a.getAuthority())
                .toList();
        if (!permisosUsuario.contains(permisoRequerido)){
            throw new ForbiddenException("No tenés permiso: " + permisoRequerido);
        }
    }
}
