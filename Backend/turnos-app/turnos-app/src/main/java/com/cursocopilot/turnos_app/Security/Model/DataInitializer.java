package com.cursocopilot.turnos_app.Security.Model;

import com.cursocopilot.turnos_app.Security.Repository.PermisoRepository;
import com.cursocopilot.turnos_app.Security.Repository.RolRepository;
import com.cursocopilot.turnos_app.Security.Repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Component
public class DataInitializer implements CommandLineRunner {
    private final PermisoRepository permisoRepo;
    private final RolRepository rolRepo;
    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            PermisoRepository permisoRepo,
            RolRepository rolRepo,
            UsuarioRepository usuarioRepo,
            PasswordEncoder passwordEncoder
    ){
        this.permisoRepo = permisoRepo;
        this.rolRepo = rolRepo;
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args){
        //1 crear permisos base
        List<String> permisosBase = List.of(
                "ver_turnos","crear_turno","editar_turno","cancelar_turno",
                "ver_clientes", "crear_cliente", "editar_cliente", "eliminar_cliente",
                "ver_profesionales", "crear_profesionales", "ediatar_profesionales",
                "ver_reportes", "imprimir_reportes"
        );
        for (String p : permisosBase){
            permisoRepo.findByNombre(p).orElseGet(() -> permisoRepo.save(new Permiso(p)));
        }

        //2 Crear roles base
        Rol admin = rolRepo.findByNombre("ADMIN").orElseGet(() -> rolRepo.save(new Rol("ADMIN")));
        Rol recep = rolRepo.findByNombre("RECEPCIONISTA").orElseGet(() -> rolRepo.save(new Rol("RECEPCIONISTA")));
        Rol prof = rolRepo.findByNombre("PROFESIONAL").orElseGet(() -> rolRepo.save(new Rol("PROFESIONAL")));
        Rol consulta = rolRepo.findByNombre("CONSULTA").orElseGet(() -> rolRepo.save(new Rol("CONSULTA")));

        //3 Asignar permisos a roles
        List<Permiso> todos = permisoRepo.findAll();
        admin.setPermisos(new HashSet<>(todos));

        recep.setPermisos(Set.of(
                permisoRepo.findByNombre("ver_turnos").get(),
                permisoRepo.findByNombre("crear_turno").get(),
                permisoRepo.findByNombre("editar_turno").get(),
                permisoRepo.findByNombre("ver_clientes").get(),
                permisoRepo.findByNombre("crear_cliente").get()
        ));
        prof.setPermisos(Set.of(
                permisoRepo.findByNombre("ver_turnos").get(),
                permisoRepo.findByNombre("crear_turno").get()
        ));
        consulta.setPermisos(Set.of(
                permisoRepo.findByNombre("ver_turnos").get(),
                permisoRepo.findByNombre("ver_clientes").get()
        ));
        rolRepo.save(admin);
        rolRepo.save(recep);
        rolRepo.save(prof);
        rolRepo.save(consulta);

        //4 crear usuario admin inicial
        if( usuarioRepo.findByEmail("admin@admin.com").isEmpty()){
            Usuario adminUser = new Usuario();
            adminUser.setNombre("Administrador");
            adminUser.setEmail("admin@admin.com");
            adminUser.setPasswordHash(passwordEncoder.encode("admin"));
            adminUser.setRoles(Set.of(admin));
            usuarioRepo.save(adminUser);
        }
    }
}
