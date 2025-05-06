export interface ContratoPostDTO {
    fechaVencimiento: string;
    plan: number;
    organizacion: number;
}

export type ContratoPatchDTO = Partial<ContratoPostDTO> & { id: number };

export interface ContratoDeleteDTO {
    id: number;
} 