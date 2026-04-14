package com.cursocopilot.turnos_app.Security.controller;

import com.cursocopilot.turnos_app.Security.LoginRequest;
import com.cursocopilot.turnos_app.Security.LoginResponse;
import com.cursocopilot.turnos_app.Security.Model.Permiso;
import com.cursocopilot.turnos_app.Security.Model.Rol;
import com.cursocopilot.turnos_app.Security.Model.Usuario;
import com.cursocopilot.turnos_app.Security.Repository.UsuarioRepository;
import com.cursocopilot.turnos_app.Security.exceptions.NotFoundException;
import com.cursocopilot.turnos_app.Security.exceptions.UnauthorizedException;
import com.cursocopilot.turnos_app.Security.service.AuthService;
import jakarta.persistence.SecondaryTable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UsuarioRepository usuarioRepo;
    public AuthController(AuthService authService, UsuarioRepository usuarioRepo){

        this.authService = authService;
        this.usuarioRepo = usuarioRepo;
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

    @GetMapping("/me")
    public LoginResponse me(){
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()){
            throw new UnauthorizedException("No estás autenticado");
        }
        String email = auth.getName();
        Usuario usuario = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        Set<String> roles = usuario.getRoles()
                .stream()
                .map(Rol::getNombre)
                .collect(Collectors.toSet());
        Set<String> permisos = usuario.getRoles()
                .stream()
                .flatMap(rol -> rol.getPermisos().stream())
                .map(Permiso::getNombre)
                .collect(Collectors.toSet());
        return new LoginResponse(
                null, //no generamos token nuevo
                usuario.getNombre(),
                usuario.getEmail(),
                roles,
                permisos
        );
    }
}
