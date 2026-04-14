package com.cursocopilot.turnos_app.Security;

import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;


import java.util.Date;
import java.util.Set;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private final SecretKey SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS256); //luego la movemos a application.properties
    public String generarToken(String email, Set<String> roles, Set<String> permisos){
        return Jwts.builder()
                .setSubject(email)
                .claim("roles", roles)
                .claim("permisos", permisos)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SECRET, SignatureAlgorithm.HS256)
                .compact();
    }
    public Claims obtenerClaims(String token){
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
    public boolean esTokenValido(String token){
        try{
            obtenerClaims(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
