export const ORGANIZACION = "/organizacion"

export const OrganizacionURL = {
    get: `${ORGANIZACION}/search`,
    getById: `${ORGANIZACION}/:id`,
    post: `${ORGANIZACION}`,
    patch: `${ORGANIZACION}/:id`,
    delete: `${ORGANIZACION}/:id`,
}
