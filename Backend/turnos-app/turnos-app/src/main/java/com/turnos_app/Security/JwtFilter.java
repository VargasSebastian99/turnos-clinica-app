package com.cursocopilot.turnos_app.Security;
/*
    Este filtro lee el header Authorization
    * Extrae el token
    * Valida el token
    * Obtiene roles y permisos
    * Crea un UsernamePasswordAuthenticationToken
    * Lo mente en el contexto de Spring Security
 */
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
        throws ServletException, IOException{
        String authHeader = request.getHeader("Authorization");
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);
            if(jwtUtil.esTokenValido(token)){
                Claims claims = jwtUtil.obtenerClaims(token);
                String email = claims.getSubject();
                List<String> roles = claims.get("roles", List.class);
                List<String> permisos = claims.get("permisos", List.class);

                List<SimpleGrantedAuthority> authorities = new ArrayList<>();

                roles.forEach(r -> authorities.add(new SimpleGrantedAuthority(r)));
                permisos.forEach(p -> authorities.add(new SimpleGrantedAuthority(p)));
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                authorities
                        );
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(request, response);
    }
}
