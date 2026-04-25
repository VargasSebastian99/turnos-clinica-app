import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";

export default function RequireParm({ permiso, children }) {
    const { user } = useAuth();

    if (!hasPermission(user, permiso)) {
        return <div>No tienes permiso para acceder a esta sección</div>;
    }
    return children;
}