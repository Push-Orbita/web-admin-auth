export const AccionModulo = "/accion-por-modulo";

export const AccionModuloURL = {
    get: `${AccionModulo}/search`,
    getById: `${AccionModulo}/:id`,
    post: `${AccionModulo}`,
    patch: `${AccionModulo}/:id`,
    delete: `${AccionModulo}/:id`
};