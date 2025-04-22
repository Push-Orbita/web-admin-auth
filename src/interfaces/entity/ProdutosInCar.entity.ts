export interface ProductoInCar {
    id: number;
    nombre: string;
    precioUnitario: number;
    cantidad: number;
    iva: {
        id: number;
        nombre: string;
        ivaPorcentaje: string;
    };
    importe_gravado: number;
    importe_iva: number;
    clienteId?: number;
    condicionIvaId?: number;
    categoria?: {
        iva?: {
            ivaPorcentaje: string;
        };
    };
    precio?: {
        venta: number;
    }[];
}