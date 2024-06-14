export const USUARIO = "/usuario";
export const UsuarioURL = {
    get: `${USUARIO}/search`,
    getById: `${USUARIO}/:id`,
    post: `${USUARIO}`,
    patch: `${USUARIO}/:id`,
    delete: `${USUARIO}/:id`
};