export const Organizacion = "/organizacion";

export const OrganizacionURL = {
    get: `${Organizacion}/search`,
    getById: `${Organizacion}/:id`,
    post: `${Organizacion}`,
    patch: `${Organizacion}/:id`,
    delete: `${Organizacion}/:id`
};