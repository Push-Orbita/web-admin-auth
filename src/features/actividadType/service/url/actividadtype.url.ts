export const ACTIVIDADTYPE = "/tipoActividad"

export const ActividadTypeURL = {
    get: `${ACTIVIDADTYPE}/search`,
    getById: `${ACTIVIDADTYPE}/:id`,
    post: `${ACTIVIDADTYPE}`,
    patch: `${ACTIVIDADTYPE}/:id`,
    delete: `${ACTIVIDADTYPE}/:id`,
}
