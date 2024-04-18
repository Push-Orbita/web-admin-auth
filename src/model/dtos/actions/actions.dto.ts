export type ActionsPostDTO = Omit<ActionsPatchDTO, "id">;

export interface ActionsPatchDTO {
    id: number,
    nombre?: string,
    descripcion?: string
}
export interface ActionsDeleteDTO {
  id: number;
}
