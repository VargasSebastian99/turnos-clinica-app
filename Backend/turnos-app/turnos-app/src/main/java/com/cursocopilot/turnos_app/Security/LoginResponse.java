package com.cursocopilot.turnos_app.Security;

import java.util.Set;

public class LoginResponse {
    private String token;
    private String nombre;
    private String email;
    private Set<String> roles;
    private Set<String> permisos;

    public LoginResponse() {
    }

    public LoginResponse(String token, String nombre, String email, Set<String> roles, Set<String> permisos) {
        this.token = token;
        this.nombre = nombre;
        this.email = email;
        this.roles = roles;
        this.permisos = permisos;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<String> getPermisos() {
        return permisos;
    }

    public void setPermisos(Set<String> permisos) {
        this.permisos = permisos;
    }
}
