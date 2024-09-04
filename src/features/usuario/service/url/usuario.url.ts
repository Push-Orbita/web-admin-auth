export const Usuario = "/usuario";

export const UsuarioURL = {
    get: `${Usuario}/search`,
    getById: `${Usuario}/:id`,
    post: `${Usuario}`,
    patch: `${Usuario}/:id`,
    delete: `${Usuario}/:id`
};