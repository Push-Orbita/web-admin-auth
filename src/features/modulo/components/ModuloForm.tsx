import React from 'react';
import { Box } from '@mui/material';
import { DynamicFormFields } from '@/components/DynamicFormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface ModuloFormProps {
    title: string;
    refetch: () => void;
    rowData?: any;
    onCancel: () => void;
    moduleKey: string;
}

const fields = [
    {
        name: 'nombre',
        type: 'text',
        gridSize: 6,
        label: 'Nombre',
        required: true,
    },
    {
        name: 'descripcion',
        type: 'text',
        gridSize: 6,
        label: 'Descripción',
        required: true,
    },
    {
        name: 'estado',
        type: 'select',
        gridSize: 6,
        label: 'Estado',
        required: true,
        options: [
            { value: 'activo', label: 'Activo' },
            { value: 'inactivo', label: 'Inactivo' },
        ],
    },
    {
        name: 'permisos',
        type: 'multiselect',
        gridSize: 12,
        label: 'Permisos',
        required: true,
        options: [
            { value: 'crear', label: 'Crear' },
            { value: 'leer', label: 'Leer' },
            { value: 'actualizar', label: 'Actualizar' },
            { value: 'eliminar', label: 'Eliminar' },
        ],
    },
];

const schema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    descripcion: z.string().min(1, 'La descripción es requerida'),
    estado: z.string().min(1, 'El estado es requerido'),
    permisos: z.array(z.string()).min(1, 'Debe seleccionar al menos un permiso'),
});

export const ModuloForm: React.FC<ModuloFormProps> = ({
    title,
    refetch,
    rowData,
    onCancel,
    moduleKey,
}) => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: rowData || {
            nombre: '',
            descripcion: '',
            estado: 'activo',
            permisos: [],
        },
    });

    const onSubmit = async (data: any) => {
        try {
            // Aquí irá la lógica para enviar los datos al servidor
            console.log('Datos del formulario:', data);
            refetch();
            onCancel();
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    return (
        <Box>
            <DynamicFormFields
                title={title}
                fields={fields}
                form={form}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </Box>
    );
}; 