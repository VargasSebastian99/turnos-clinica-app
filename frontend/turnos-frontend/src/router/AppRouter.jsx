import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/turnos" element={<ProtectedRoute><TurnosPage /></ProtectedRoute>} />
          <Route path="/turnos/:id" element={<ProtectedRoute><TurnoView /></ProtectedRoute>}/>
          <Route path="/turnos/:id/editar" element={<ProtectedRoute><TurnoEdit /></ProtectedRoute>} />
          <Route path="/turnos/crear" element={<ProtectedRoute><TurnoCreate /></ProtectedRoute>} />
          <Route path="/especialidades" element={<ProtectedRoute><EspecialidadesPage /></ProtectedRoute>} />
          <Route path="/especialidades/:id" element={<ProtectedRoute><EspecialidadView /></ProtectedRoute>} />
          <Route path="/especialidades/:id/editar" element={<ProtectedRoute><EspecialidadEdit /></ProtectedRoute>} />
          <Route path="/especialidades/crear" element={<ProtectedRoute><EspecialidadCreate /></ProtectedRoute>} />
          <Route path="/servicios" element={<ProtectedRoute><ServiciosPage /></ProtectedRoute>} />
          <Route path="/servicios/:id" element={<ProtectedRoute><ServicioView /></ProtectedRoute>} />
          <Route path="/servicios/:id/editar" element={<ProtectedRoute><ServicioEdit /></ProtectedRoute>} />
          <Route path="/servicios/crear" element={<ProtectedRoute><ServicioCreate /></ProtectedRoute>} />
          <Route path="/profesionales" element={<ProtectedRoute><ProfesionalesPage especialidades={especialidadesMock} /></ProtectedRoute>} />
          <Route path="/profesionales/:id" element={<ProtectedRoute><ProfesionalView /></ProtectedRoute>} />
          <Route path="/profesionales/:id/editar" element={<ProtectedRoute><ProfesionalEdit especialidades={especialidadesMock} /></ProtectedRoute>} />
          <Route path="/profesionales/crear" element={<ProtectedRoute><ProfesionalCreate especialidades={especialidadesMock} /></ProtectedRoute>} />
          <Route path="/clientes" element={<ProtectedRoute><ClientesPage /></ProtectedRoute>} />
          <Route path="/clientes/:id" element={<ProtectedRoute><ClienteView /></ProtectedRoute>} />
          <Route path="/clientes/:id/editar" element={<ProtectedRoute><ClienteEdit /></ProtectedRoute>} />
          <Route path="/clientes/crear" element={<ProtectedRoute><ClienteCreate /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}