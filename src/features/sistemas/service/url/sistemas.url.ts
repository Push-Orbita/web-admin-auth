export const Sistemas = "/sistema";

export const SistemasURL = {
    get: `${Sistemas}/search`,
    getById: `${Sistemas}/:id`,
    post: `${Sistemas}`,
    patch: `${Sistemas}/:id`,
    delete: `${Sistemas}/:id`
};