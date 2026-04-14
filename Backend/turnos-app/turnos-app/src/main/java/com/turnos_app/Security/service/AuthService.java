package com.cursocopilot.turnos_app.Security.service;

import com.cursocopilot.turnos_app.Security.JwtUtil;
import com.cursocopilot.turnos_app.Security.LoginRequest;
import com.cursocopilot.turnos_app.Security.LoginResponse;
import com.cursocopilot.turnos_app.Security.Model.Permiso;
import com.cursocopilot.turnos_app.Security.Model.Rol;
import com.cursocopilot.turnos_app.Security.Model.Usuario;
import com.cursocopilot.turnos_app.Security.Repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil){
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    public LoginResponse login(LoginRequest request){
        Usuario usuario = usuarioRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if(!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())){
            throw new RuntimeException("Contraseña incorrecta");
        }
        Set<String> roles = usuario.getRoles()
                .stream()
                .map(Rol::getNombre)
                .collect(Collectors.toSet());
        Set<String> permisos = usuario.getRoles()
                .stream()
                .flatMap(rol -> rol.getPermisos().stream())
                .map(Permiso::getNombre)
                .collect(Collectors.toSet());
        String token = jwtUtil.generarToken(usuario.getEmail(), roles, permisos);
        return new LoginResponse(token, usuario.getNombre(), usuario.getEmail(),roles, permisos);
    }
}
