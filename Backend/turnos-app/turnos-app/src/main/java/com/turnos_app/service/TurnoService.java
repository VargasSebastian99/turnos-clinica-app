package com.cursocopilot.turnos_app.service;

import com.cursocopilot.turnos_app.model.*;
import com.cursocopilot.turnos_app.repository.ClienteRepository;
import com.cursocopilot.turnos_app.repository.ProfesionalRepository;
import com.cursocopilot.turnos_app.repository.ServicioRepository;
import com.cursocopilot.turnos_app.repository.TurnoRepository;
import com.cursocopilot.turnos_app.turnos.specifications.TurnoSpecification;
import io.micrometer.observation.ObservationTextPublisher;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class TurnoService {
    private final TurnoRepository repository;
    private final ClienteRepository clienteRepository;
    private final ProfesionalRepository profesionalRepository;
    private final ServicioRepository servicioRepository;
    private static final List<LocalDate> FERIADOS = List.of(
            LocalDate.of(2026,1,1),
            LocalDate.of(2026,5,25),
            LocalDate.of(2026,7,9),
            LocalDate.of(2026,12,25)

    );
    public TurnoService (
            TurnoRepository repository,
            ClienteRepository clienteRepository,
            ProfesionalRepository profesionalRepository,
            ServicioRepository servicioRepository
    ){
        this.repository = repository;
        this.clienteRepository = clienteRepository;
        this.profesionalRepository = profesionalRepository;
        this.servicioRepository = servicioRepository;
    }

    public List<Turno> obtenerTodos(){
        return repository.findAll();
    }
    public Turno obtenerPorId(Long id){
        return repository.findById(id).orElse(null);
    }
    public Turno crear(Turno turno){
        // validar existencia de entidades
        turno.setCliente(
                clienteRepository.findById(turno.getCliente().getId()).orElse(null)
        );
        turno.setProfesional(
                profesionalRepository.findById(turno.getProfesional().getId()).orElse(null)
        );
        turno.setServicio(
                servicioRepository.findById(turno.getServicio().getId()).orElse(null)
        );
        // validar solapamiento
        validarSolapamiento(turno);
        // validar turno en el pasado
        validarTurnoEnElPasado(turno);
        //validar horario del profesional
        validarHorarioLaboral(turno);
        //validat solapamientos horarios cliente
        validarTurnoCliente(turno);
        //validar día no laborable
        validarHorarioLaboral(turno);
        //validar especialidades
        validarServicioEspecialidad(turno);
        validarEstadoProfesional(turno);
        validarClienteActivo(turno);
        validarServicioActivo(turno);
        validarEspecialidadActiva(turno);
        turno.setEstado(EstadoTurno.PENDIENTE);
        return repository.save(turno);
    }
    public Turno actualizar(Long id, Turno datos){
        Turno existente = obtenerPorId(id);

        if(existente == null) return null;
        if(existente.getEstado() == EstadoTurno.CANCELADO){
            throw new IllegalArgumentException("No se puede modificar un turno cancelado");
        }
        existente.setFecha(datos.getFecha());
        existente.setHora(datos.getHora());
        existente.setEstado(datos.getEstado());
        existente.setCliente(
                clienteRepository.findById(datos.getCliente().getId()).orElse(null)
        );
        existente.setProfesional(
                profesionalRepository.findById(datos.getProfesional().getId()).orElse(null)
        );
        existente.setServicio(
                servicioRepository.findById(datos.getServicio().getId()).orElse(null)
        );
        validarEstadoProfesional(existente);
        validarServicioEspecialidad(existente);
        validarHorarioLaboral(existente);
        validarSolapamiento(existente);
        validarTurnoCliente(existente);
        validarDiaNoLaborable(existente);
        validarTurnoEnElPasado(existente);
        validarClienteActivo(existente);
        validarServicioActivo(existente);
        validarEspecialidadActiva(existente);
        return repository.save(existente);
    }
    public boolean eliminar(Long id){
        Turno t = obtenerPorId(id);
        if(t == null) return false;
        t.setEstado(EstadoTurno.CANCELADO);
        t.setFechaBaja(LocalDate.now());
        repository.save(t);
        return true;
    }
    // validar que el turno no se inserte en el pasado (fecha anterior o hora anterioro a la actual del servidor)
    private void validarTurnoEnElPasado(Turno turno){
        LocalDate  hoy= LocalDate.now();
        LocalTime ahora = LocalTime.now();
        //Si la fecha es anterior a hoy es invalido
        if(turno.getFecha().isBefore(hoy)){
            throw new IllegalArgumentException("No se pueden crear turnos a fechas anteriores a la de hoy");
        }
        // si la fecha es hoy y la hora ya paso es invalido
        if(turno.getFecha().isEqual(hoy) && turno.getHora().isBefore(ahora)){
            throw new IllegalArgumentException("No se pueden crear turnos anteriores a la hora actual");
        }
    }
    //validar horario profesional
    private void validarHorarioLaboral(Turno turno){
        Profesional p = turno.getProfesional();
        LocalTime inicioNuevo = turno.getHora();
        int duracion = turno.getServicio().getDuracionMinutos();
        LocalTime finNuevo = inicioNuevo.plusMinutes(duracion);
        boolean enManiana =
                p.getHoraInicioManiana() != null &&
                p.getHoraFinManiana() != null &&
                !inicioNuevo.isBefore(p.getHoraInicioManiana()) &&
                !finNuevo.isAfter(p.getHoraFinManiana());
        boolean enTarde =
                p.getHoraInicioTarde() != null &&
                p.getHoraFinTarde() != null &&
                !inicioNuevo.isBefore(p.getHoraInicioTarde()) &&
                !finNuevo.isAfter(p.getHoraFinTarde());
        if(!enManiana && !enTarde){
            throw new IllegalArgumentException("El turno esta fuera del horario laboral del profesional");
        }
    }
    //validar solapamientos de turnos
    private void validarSolapamiento(Turno turno){
        if(turno.getEstado() == EstadoTurno.CANCELADO){
            return;
        }
        List<Turno> turnosDelDia = repository.findByProfesionalIdAndFecha(
                turno.getProfesional().getId(),
                turno.getFecha()
        );
        int duracion = turno.getServicio().getDuracionMinutos();
        LocalTime inicioNuevo = turno.getHora();
        LocalTime finNuevo = inicioNuevo.plusMinutes(duracion);

        for (Turno t : turnosDelDia){
            int duracionExistente = t.getServicio().getDuracionMinutos();
            LocalTime inicioExistente = t.getHora();
            LocalTime finExistente = inicioExistente.plusMinutes(duracionExistente);
            boolean seSolapa = inicioNuevo.isBefore(finExistente) && finNuevo.isAfter(inicioExistente);
            if (seSolapa){
                throw new IllegalArgumentException("El profesional ya tiene un turno en ese horario");
            }
        }
    }
    //validar solapamientos de horarios en clientes
    private void validarTurnoCliente(Turno turno){
        List<Turno> turnosDelDia = repository.findByClienteIdAndFecha(
                turno.getCliente().getId(),
                turno.getFecha()
        );
        int duracion = turno.getServicio().getDuracionMinutos();
        LocalTime inicioNuevo = turno.getHora();
        LocalTime finNuevo = inicioNuevo.plusMinutes(duracion);
        for(Turno t : turnosDelDia){
            int duracionExistente = t.getServicio().getDuracionMinutos();
            LocalTime inicioExistente = t.getHora();
            LocalTime finExistente = inicioExistente.plusMinutes(duracionExistente);
            boolean seSolapa = inicioNuevo.isBefore(finExistente) && finNuevo.isAfter(inicioExistente);
            if(seSolapa){
                throw new IllegalArgumentException("El cliente ya tiene un turno existente en ese horario");
            }
        }
    }
    //validar turno en día no laborable
    private void validarDiaNoLaborable(Turno turno){
        if(turno.getFecha().getDayOfWeek() == DayOfWeek.SUNDAY){
            throw new IllegalArgumentException("No se puede crear turnos en días domingos");
        }
        if(FERIADOS.contains(turno.getFecha())){
            throw new IllegalArgumentException("No se puede crear turnos en días no laborables");
        }
    }
    //validar especialidad
    private void validarServicioEspecialidad(Turno turno){
        Especialidad espProfesional = turno.getProfesional().getEspecialidad();
        Especialidad espServicio = turno.getServicio().getEspecialidad();
        if(!espProfesional.getId().equals(espServicio.getId())){
            throw new IllegalArgumentException("El profesional seleccionado no puede realizar este servicio, no corresponde a su especialidad");
        }
    }
    private void validarEstadoProfesional(Turno turno){
        if(!turno.getProfesional().isActivo()){
            throw new IllegalArgumentException("El profesional no esta disponible para atender");
        }
        if(turno.getProfesional().getEstado() != EstadoProfesional.ACTIVO ){
            throw new IllegalArgumentException("El profesional no esta disponible para atender");
        }

    }
    //validar cliente activo
    private void validarClienteActivo(Turno turno){
        if(!turno.getCliente().isActivo()){
            throw new IllegalArgumentException("El cliente está dado de baja");
        }
    }
    //validar servicio activo
    private void validarServicioActivo(Turno turno){
        if(!turno.getServicio().isActivo()){
            throw new IllegalArgumentException("El servicio está dado de baja");
        }
    }
    //validar especialidad activa
    private void validarEspecialidadActiva(Turno turno){
        if(!turno.getProfesional().getEspecialidad().isActivo()){
            throw new IllegalArgumentException("La especialidad del profesional está dada de baja");
        }
        if(!turno.getServicio().getEspecialidad().isActivo()){
            throw new IllegalArgumentException("La especialidad del servicio está dada de baja");
        }
    }
    // reactivar un turno
    public boolean reactivar(Long id) {

        Turno t = obtenerPorId(id);
        if (t == null) return false;

        // Solo se pueden reactivar turnos cancelados
        if (t.getEstado() != EstadoTurno.CANCELADO) {
            throw new IllegalArgumentException("Solo se pueden reactivar turnos cancelados");
        }

        // Volvemos a validar TODO como si fuera un turno nuevo
        validarEstadoProfesional(t);
        validarServicioEspecialidad(t);
        validarEspecialidadActiva(t);
        validarServicioActivo(t);
        validarClienteActivo(t);
        validarHorarioLaboral(t);
        validarSolapamiento(t);
        validarTurnoCliente(t);
        validarDiaNoLaborable(t);
        validarTurnoEnElPasado(t);

        // Reactivación
        t.setEstado(EstadoTurno.PENDIENTE);
        t.setFechaBaja(null);

        repository.save(t);
        return true;
    }
    //Obtener agenda diaria
    public List<Turno> obtenerAgendaDiaria(Long profesionalId, LocalDate fecha){
        return repository.findByProfesionalIdAndFechaOrderByHoraAsc(profesionalId, fecha);
    }
    // obtener turnos cliente
    public List<Turno> obtenerTurnosPorCliente(Long clienteId){
        return repository.findByClienteIdOrderByFechaAscHoraAsc(clienteId);
    }
    //obtener turnos futuros
    public List<Turno> obtenerTurnosFuturos(){
        LocalDate hoy = LocalDate.now();
        return repository.findByFechaGreaterThanEqualOrderByFechaAscHoraAsc(hoy);
    }
    public List<Turno> obtenerTurnosCancelados(EstadoTurno estado){
        return repository.findByEstadoOrderByFechaAscHoraAsc(estado);
    }
    public Page<Turno> buscarTurnos(
            EstadoTurno estado,
            Long profesionalId,
            Long clienteId,
            LocalDate desde,
            LocalDate hasta,
            Pageable pageable
    ){
        Specification<Turno> spec = TurnoSpecification.conFiltros(estado, profesionalId, clienteId, desde, hasta);
        return repository.findAll(spec, pageable);
    }

}
