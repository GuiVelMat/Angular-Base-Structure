/**
 * Representa los datos de usuario tal como se reciben de la API/base de datos
 * Coincide con la estructura de la tabla Users en SQL Server
 */
export interface UserDTO {
    id: number;
    nombre: string;
    cif: string;
    direccion: string;
    telefono: string;
    observaciones?: string;
}