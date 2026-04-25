export function hasPermission(user, permiso) {
    return user?.permisos?.includes(permiso);
}