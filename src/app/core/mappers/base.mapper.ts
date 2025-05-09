export interface Mapper<T, U> {
    mapFrom(param: T): U
    mapTo(param: U): T
}

/**
 *  Mapper genérico que convierte entre DTOs y modelos de dominio.
 *  Está con una versión de elementos individuales y otra de arrays
 *  para poder utilizarlos en la mayoría de casos de los services.
 * 
 * * T es el tipo de dato de origen (DTO)
 * * U es el tipo de dato de destino (modelo)
 */
export abstract class BaseMapper<T, U> implements Mapper<T, U> {
    // Convierte de T (DTO) a U (modelo) para usar en el frontend
    abstract mapFrom(param: T): U
    // Convierte de U (modelo) a T (DTO) para enviar al backend
    abstract mapTo(param: U): T

    mapFromArray(params: T[]): U[] {
        return params.map((param) => this.mapFrom(param))
    }

    mapToArray(params: U[]): T[] {
        return params.map((param) => this.mapTo(param))
    }
}

