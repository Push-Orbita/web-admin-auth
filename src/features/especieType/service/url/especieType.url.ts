export const EspecieType = "/especie"

export const EspecieTypeURL = {
    get: `${EspecieType}/search`,
    getById: `${EspecieType}/:id`,
    post: `${EspecieType}`,
    patch: `${EspecieType}/:id`,
    delete: `${EspecieType}/:id`,
}
