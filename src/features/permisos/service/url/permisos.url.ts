export const Permisos = "/permiso";

export const PermisosURL = {
    get: `${Permisos}/search`,
    getById: `${Permisos}/:id`,
    post: `${Permisos}`,
    patch: `${Permisos}/:id`,
    delete: `${Permisos}/:id`
};