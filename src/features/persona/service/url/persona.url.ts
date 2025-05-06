export const Persona = "/persona";

export const PersonaURL = {
    get: `${Persona}/search`,
    getById: `${Persona}/:id`,
    post: `${Persona}`,
    patch: `${Persona}/:id`,
    delete: `${Persona}/:id`
}; 