export const RazaType = "/raza"

export const RazaTypeURL = {
    get: `${RazaType}/search`,
    getById: `${RazaType}/:id`,
    post: `${RazaType}`,
    patch: `${RazaType}/:id`,
    delete: `${RazaType}/:id`,
}
