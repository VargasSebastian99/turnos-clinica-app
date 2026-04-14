package com.cursocopilot.turnos_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "especialidades")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Especialidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "El nombre de la especialidad es obligatorio")
    @Column(unique = true)
    private String nombre;
    private boolean activo = true;
    private LocalDate fechaBaja;
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime fechaAlta;
    @LastModifiedDate
    private LocalDateTime fechaModificacion;
    @OneToMany(mappedBy = "especialidad", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Profesional> profesionales = new ArrayList<>();
}
