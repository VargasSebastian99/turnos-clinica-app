package com.turnos_app.turnos.specifications;

import com.turnos_app.model.EstadoTurno;
import com.turnos_app.model.Turno;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

public class TurnoSpecification {
    public static Specification<Turno> conFiltros(
    EstadoTurno estado,
    Long profesionalId,
    Long clienteId,
    LocalDate desde,
    LocalDate hasta
            ){
    return (root, query, cb) ->{
        List<Predicate> predicates = new ArrayList<>();
        if (estado != null){
            predicates.add(cb.equal(root.get("estado"), estado));
        }
        if(profesionalId != null){
            predicates.add(cb.equal(root.get("profesional").get("id"), profesionalId));
        }
        if(clienteId != null){
            predicates.add(cb.equal(root.get("cliente").get("id"), clienteId));
        }
        if(desde != null){
            predicates.add(cb.greaterThanOrEqualTo(root.get("fecha"), desde));
        }
        if(hasta != null){
            predicates.add(cb.lessThanOrEqualTo(root.get("fecha"), hasta));
        }
        query.orderBy(cb.asc(root.get("fecha")), cb.asc(root.get("hora")));
        return cb.and(predicates.toArray(new Predicate[0]));
    };
    }

}
