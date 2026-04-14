import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex gap-6">
        <Link to="/" className="font-semibold hover:text-blue-600">
          Inicio
        </Link>

        <Link to="/turnos" className="font-semibold hover:text-blue-600">
          Turnos
        </Link>
        <nav>
            <Link to="/profesionales" className="font-semibold hover:text-blue-600">Profesionales</Link>
        </nav>
        <nav>
            <Link to="/clientes" className="font-semibold hover:text-blue-600">Clientes</Link>
        </nav>

        <nav>
          <Link to="/especialidades" className="font-semibold hover:text-blue-600">Especialidades</Link>
        </nav>

        <nav>
          <Link to="/servicios" className="font-semibold hover:text-blue-600">Servicios</Link>
        </nav>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}