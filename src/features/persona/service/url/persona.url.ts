export const Persona = "/Persona";

export const PersonaURL = {
    get: `${Persona}/search`,
    getById: `${Persona}/:id`,
    post: `${Persona}`,
    patch: `${Persona}/:id`,
    delete: `${Persona}/:id`
};