package com.cursocopilot.turnos_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "profesionales")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profesional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @Enumerated(EnumType.STRING)
    private EstadoProfesional estado = EstadoProfesional.ACTIVO;
    @ManyToOne
    @JoinColumn(name = "especialidad_id")
    private Especialidad especialidad;
    private LocalTime horaInicioManiana;
    private LocalTime horaFinManiana;
    private LocalTime horaInicioTarde;
    private LocalTime horaFinTarde;
    private boolean activo = true;
    private LocalDate fechaBaja;
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime fechaAlta;
    @LastModifiedDate
    private LocalDateTime fechaModificacion;
    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Turno> turnos = new ArrayList<>();

}
