import { Injectable } from "@angular/core"
import { BaseMapper } from "./base.mapper"
import { UserDTO } from "../models/DTO/user.dto"
import { User } from "../models/User"

@Injectable({
    providedIn: "root",
})
export class UserMapper extends BaseMapper<UserDTO, User> {
    /**
     * Convierte de DTO (formato de API/BD) a modelo
     * 
     * Además, gracias al base mapper, solo necesitamos crear el mapFrom y no el mapFromArray ya que
     * el base mapper ya lo tiene implementado y lo puedes cargar en los servicios gracias al extends
     */
    mapFrom(dto: UserDTO): User {
        return {
            id: dto.id,
            nombre: dto.nombre,
            cif: dto.cif,
            direccion: dto.direccion,
            telefono: dto.telefono,
            observaciones: dto.observaciones || "",
            // Propiedades derivadas que se crean en el mapper y solo se utilizan en el frontend
            nombreFormateado: `${dto.nombre} (${dto.cif})`,
        }
    }

    /**
     * Convierte de modelo a DTO (formato de API/BD)
     */
    mapTo(user: User): UserDTO {
        return {
            id: user.id,
            nombre: user.nombre,
            cif: user.cif,
            direccion: user.direccion,
            telefono: user.telefono,
            observaciones: user.observaciones || "",
            // No incluimos propiedades derivadas ya que no existen en la BD
        }
    }
}

