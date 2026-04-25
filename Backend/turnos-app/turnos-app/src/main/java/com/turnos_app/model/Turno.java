package com.turnos_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "turnos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fecha;
    private LocalTime hora;
    @JoinColumn(name = "cliente_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "servicio_id")
    @JsonIgnore
    private Servicio servicio;

    @ManyToOne
    @JoinColumn(name = "profesional_id")
    @JsonIgnore
    private Profesional profesional;
    @Enumerated(EnumType.STRING)
    private EstadoTurno estado; //pendiente, confirmado, cancelado
    private boolean activo = true;
    private LocalDate fechaBaja;
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime fechaAlta;
    @LastModifiedDate
    private LocalDateTime fechaModificacion;



}
