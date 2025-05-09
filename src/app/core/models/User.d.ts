/**
 * El model se utiliza en el frontend de la aplicación para manejar los datos que nos proporciona  el mapper
 * que es el que se encarga de convertir los datos que las DTO recojen de la API.
 */
export interface User {
    id: number;
    nombre: string;
    cif: string;
    direccion: string;
    telefono: string;
    observaciones?: string;
    nombreFormateado?: string;
}

export type UserWithoutId = Omit<User, "id">;
