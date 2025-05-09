import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { User, UserWithoutId } from "../core/models/User";
import { UserService } from "../core/services/user.service";

// * Definimos el estado del store con un type indicando la estructura de los datos
type UserState = {
    users: User[];
    isLoading: boolean
    userToEdit: User | null
};

// * inicializamos el estado del store a valores por defecto
const initialState: UserState = {
    users: [],
    isLoading: false,
    userToEdit: null
};
export const UserStore = signalStore(
    { providedIn: 'root' },
    /**  
     * * ^^^^^^^^^^^^^^^^
     * * Con esta línea podemos inyectar el store a nivel global de la aplicación.
     * * Si no se pone, podemos decidir inyectar el store en cada componente que lo necesite para menor carga en el "provider"
     * * y así generamos menos carga en la aplicación, aunque concretamente el user.store se debería utilizar a nivel global de la aplicación
     * * para tener los datos del usuario logueado en todo momento.
     */
    withState(initialState),
    withMethods((store, userService = inject(UserService)) => ({
        // Método para cargar todos los usuarios
        async loadUsers(): Promise<void> {
            // * PatchState es la función que permite cambiar el estado del store.
            patchState(store, { isLoading: true });

            // * Con el await esperamos a que se resuelva la promesa de la función GetAllUsers
            const users = await userService.GetAllUsers();
            // * y le inyectamos a la variable users para actualizar el estado del store
            patchState(store, { users, isLoading: false });
        },

        // Método para buscar usuarios por nombre
        async loadUserByName(name: string): Promise<void> {
            patchState(store, { isLoading: true });

            const users = await userService.GetUserByName(name);
            patchState(store, { users, isLoading: false });
        },

        // Método para crear un usuario
        async createUser(user: User): Promise<void> {
            patchState(store, { isLoading: true });

            await userService.CreateUser(user);
            await this.loadUsers();
        },

        // Métodos para actualizar un usuario
        saveUserToEdit(user: User): void {
            patchState(store, { userToEdit: user });
        }, // Guardamos los datos de un usuario concreto para poder recogerlos en el form de editar.

        clearUserToEdit(): void {
            patchState(store, { userToEdit: null });
        },

        async updateUser(user: User): Promise<void> {
            patchState(store, { isLoading: true });

            await userService.UpdateUser(user);
            await this.loadUsers();
        },

        // Método para eliminar un usuario
        async deleteUser(id: number): Promise<void> {
            patchState(store, { isLoading: true });

            await userService.DeleteUser(id);
            await this.loadUsers();
        },
    }))
);