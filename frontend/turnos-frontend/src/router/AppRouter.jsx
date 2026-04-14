import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import TurnosPage from "../pages/turnos/TurnosPage";
import TurnoCreate from "../components/turnos/TurnoCreate";
import TurnoEdit from "../components/turnos/TurnoEdit";
import TurnoView from "../pages/turnos/TurnoView";
import ServicioView from "../pages/servicios/ServicioView";
import EspecialidadesPage from "../pages/especialidades/EspecialidadesPage";
import EspecialidadView from "../pages/especialidades/EspecialidadView";
import EspecialidadCreate from "../components/especialidades/EspecialidadCreate";
import EspecialidadEdit from "../components/especialidades/EspecialidadEdit";
import ServiciosPage from "../pages/servicios/ServiciosPage";
import ServicioEdit from "../components/servicios/ServicioEdit";
import ServicioCreate from "../components/servicios/ServicioCreate";
import ProfesionalesPage from "../pages/profesionales/ProfesionalesPage";
import ProfesionalView from "../pages/profesionales/ProfesionalView";
import ProfesionalEdit from "../components/profesionales/profesionalEdit";
import ProfesionalCreate from "../components/profesionales/profesionalCreate";
import ClientesPage from "../pages/clientes/ClientesPage";
import ClienteView from "../pages/clientes/ClienteView";
import ClienteCreate from "../components/clientes/ClienteCreate";
import ClienteEdit from "../components/clientes/ClienteEdit";
const especialidadesMock = [
    {id: 1, nombre: "Dermatología" },
    {id: 2, nombre: "Kinesiología" },
    {id: 3, nombre: "Cardiología" }

    ]
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/turnos" element={<TurnosPage />} />
          <Route path="/turnos/:id" element={<TurnoView />}/>
          <Route path="/turnos/:id/editar" element={<TurnoEdit />} />
          <Route path="/turnos/crear" element={<TurnoCreate />} />
          <Route path="/especialidades" element={<EspecialidadesPage />} />
          <Route path="/especialidades/:id" element={<EspecialidadView />} />
          <Route path="/especialidades/:id/editar" element={<EspecialidadEdit />} />
          <Route path="/especialidades/crear" element={<EspecialidadCreate />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/servicios/:id" element={<ServicioView />} />
          <Route path="/servicios/:id/editar" element={<ServicioEdit />} />
          <Route path="/servicios/crear" element={<ServicioCreate />} />
          <Route path="/profesionales" element={<ProfesionalesPage especialidades={especialidadesMock} />} />
          <Route path="/profesionales/:id" element={<ProfesionalView />} />
          <Route path="/profesionales/:id/editar" element={<ProfesionalEdit especialidades={especialidadesMock} />} />
          <Route path="/profesionales/crear" element={<ProfesionalCreate especialidades={especialidadesMock} />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/:id" element={<ClienteView />} />
          <Route path="/clientes/:id/editar" element={<ClienteEdit />} />
          <Route path="/clientes/crear" element={<ClienteCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}