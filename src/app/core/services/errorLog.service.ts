import { Injectable } from "@angular/core";
import { logErrorMapper } from "../mappers/logError.mapper";
import { apiService } from "./api/api.service";

@Injectable({ providedIn: 'root' })
export class ErrorLogService {

    constructor(
        private logErrorMapper: logErrorMapper
    ) { }

    async GetAllErrorLogs() {
        return this.logErrorMapper.mapFromArray(await apiService('/ErrorLog', 'GET'));
    }

    async GetErrorLogByType(type: string) {
        return this.logErrorMapper.mapFromArray(await apiService(`/ErrorLog/search?type=${type}`, 'GET'));
    }
}