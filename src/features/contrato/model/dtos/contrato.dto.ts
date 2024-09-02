export type ContratoPatchDTO = Partial<ContratoPostDTO> & { id: number };

export interface ContratoPostDTO {
    fechaVencimiento:  Date | string,
    plan: number,
    organizacion: number
}

export interface ContratoDeleteDTO {
    id: number;
}