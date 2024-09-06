export type ModuloPatchDTO = Partial<ModuloPostDTO> & { id: number };

export interface ModuloPostDTO {
    body: ModuloFields[]
    sistema: number;

}
export interface ModuloDeleteDTO {
    id: number;
}

export interface ModuloFields {
    nombre: string;
    descripcion: string;
    label: string;
    element: string;
    icon: string;
    path: string;
    moduloPadre: number;
   
}


