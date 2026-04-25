package com.turnos_app.security.service;

import com.turnos_app.security.JwtUtil;
import com.turnos_app.security.LoginRequest;
import com.turnos_app.security.LoginResponse;
import com.turnos_app.security.Model.Permiso;
import com.turnos_app.security.Model.Rol;
import com.turnos_app.security.Model.Usuario;
import com.turnos_app.security.Repository.UsuarioRepository;
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
