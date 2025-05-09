import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { debounceTime, distinctUntilChanged, from, pipe, switchMap, tap } from "rxjs";
import { LogError } from "../core/models/LogError";
import { ErrorLogService } from "../core/services/errorLog.service";

type ErrorLogtate = { errorLogs: LogError[]; isLoading: boolean };

const initialState: ErrorLogtate = {
    errorLogs: [],
    isLoading: false,
};

export const ErrorLogtore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, errorLogervice = inject(ErrorLogService)) => ({
        // Método para cargar todos los errores
        async loadErrorLog(): Promise<void> {
            patchState(store, { isLoading: true });

            const errorLogs = await errorLogervice.GetAllErrorLogs();
            patchState(store, { errorLogs, isLoading: false });
        },

        // Método para buscar errores por su tipo
        async loadErrorLogByType(errorType: string): Promise<void> {
            patchState(store, { isLoading: true });

            const errorLogs = await errorLogervice.GetErrorLogByType(errorType);
            patchState(store, { errorLogs, isLoading: false });
        },
    }))
);