import { Injectable } from "@angular/core";
import { BaseMapper } from "./base.mapper";
import { logErrorDTO } from "../models/DTO/logError.dto";
import { LogError } from "../models/LogError";

@Injectable({ providedIn: 'root' })
export class logErrorMapper extends BaseMapper<logErrorDTO, LogError> {
    mapFrom(dto: logErrorDTO): LogError {
        // Función para agregar padding a números de un solo dígito
        // Esto asegura que los números siempre tengan al menos dos dígitos
        // Por ejemplo, 5 se convierte en "05"
        const pad = (num: number) => num.toString().padStart(2, "0")
        const formattedDate = `${pad(dto.createdAt.getDate())}/${pad(dto.createdAt.getMonth() + 1)}/${dto.createdAt.getFullYear()} ${pad(dto.createdAt.getHours())}:${pad(dto.createdAt.getMinutes())}:${pad(dto.createdAt.getSeconds())}`

        return {
            id: dto.id,
            error: dto.error || "",
            message: dto.message || "",
            type: dto.type || "",
            createdAt: dto.createdAt,
            formatedDate: formattedDate,
        }
    }

    mapTo(logError: LogError): logErrorDTO {
        return {
            id: logError.id,
            error: logError.error,
            message: logError.message,
            type: logError.type,
            createdAt: logError.createdAt,
        }
    }
}