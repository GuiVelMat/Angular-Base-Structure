import type { Injector } from "@angular/core"
import { ToastrService } from "ngx-toastr"

let injector: Injector

export function setInjectorToastr(injectorInstance: Injector) {
    injector = injectorInstance
}

export function getToastr(): ToastrService {
    return injector.get(ToastrService)
}

export const createToast = {
    success: (title: string, message: string = "") => {
        const toastr = getToastr()
        toastr.success(message, title)
    },
    error: (title: string, message: string = "") => {
        const toastr = getToastr()
        toastr.error(message, title)
    }
}
