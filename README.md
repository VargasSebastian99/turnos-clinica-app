# Turnos-clinica-app -Plataforma de Gestión de Turnos (fullstack)

Esta es una plataforma para la gestión de turnos médicos, construida con el siguiente stack:
- Backend:
    Spring Boot 3 + JWT + RBAC (Roles y Permisos)
- Frontend:
    React + Vite + TailwindCSS
- Arquitectura:
    Cliente/Servidor con autenticación basada en tokens y control de acceso granular

El objetivo del proyecto es ofrecer una base sólida, escalable y lista para evolucionar hacia un Saas real.

---
# Tecnologías Principales
## Backend (Java + Spring Boot)
- Java 17
- Spring Boot 3.5
- Spring Security 6
- JWT (JJWT 0.11.5)
- Spring Data JPA + Hibernate
- MySQL / PostgreSQL / H2
- Maven

##Frontend (React)
- React 18
- Vite
- TailwindCSS
- Axios
- React Router DOM

---
# Seguridad ( JWT + Roles + Permisos)
El backend implementa un sistema de seguridad basado en RBAC

### Autenticación
- Login vía '/auth/login'
- Devuelve un JWT con:
    * email
    * roles
    * permisos
### Autorización por permisos
Cada endpoint puede requerir permisos específicos
@RequirePermiso("crear_turno")
### Filtro JWT
- Valida token
- Carga usuario en el contexto de Spring Security
- Expone roles y permisos como authorities

# Manejo de errores
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error
---
# Instalación y ejecución
1- Clonar repositorio
2- configurar base de datos en application.properties
***
    spring.datasource.url=jdbc:mysql://localhost:3306/turnos
    spring.datasource.username=root
    spring.datasource.password=tu_password
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
***
3- Instalar dependencias
mvn clean install
4- Ejecutar
mvn spring-boot:run

5- usuario admin inicial
    email: admin@admin.com
    password: admin
---
# Frontend - Instalación y ejecución
1- Instalar dependencias
    npm install

2- ejecutar en modo desarrollo
    npm run dev

---
# Endpoints principales

* Público
    POST "/auth/login" Login y obtención de JWT

* Protegidos
    método, Endpoint, Permiso requerido
    GET "/turnos" ver_turnos
    POST "/turnos" crar_turnos
    POST "/turnos/{id} editar_turno
    DELETE "/turnos/{id}" cancelar turno

---
## Roadmap
- [x] Fase 1 — CRUD de entidades
- [x] Fase 2 — Seguridad (JWT + RBAC)
- [x] Fase 3 — Integración inicial frontend
- [ ] Fase 4 — UI profesional (modales, tablas, formularios)
- [ ] Fase 5 — Dashboard y reportes
- [ ] Fase 6 — Auditoría y logs
- [ ] Fase 7 — Deploy en producción (Render / Railway / AWS)