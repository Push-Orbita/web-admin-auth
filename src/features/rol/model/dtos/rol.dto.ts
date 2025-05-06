import { Rol } from '@features/permisos/model/entity/permisos.entity';

export interface CreateRolDto {
    nombre: string;
    descripcion: string;
    accionesPorRol: CreateAccionesPorRolDto[];
}

export interface CreateAccionesPorRolDto {
    nombre: string;
    descripcion: string;
    permisosDeAcceso: CreatePermisosDeAccesoDto[];
}

export interface CreatePermisosDeAccesoDto {
    nombre: string;
    descripcion: string;
}

export interface UpdateRolDto extends Partial<CreateRolDto> { }

export interface RolResponseDto extends Rol { }

export interface RolListResponseDto {
    data: RolResponseDto[];
    total: number;
    page: number;
    limit: number;
} 