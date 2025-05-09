import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-list/user-list.component').then(c => c.UserListComponent)
    },
    {
        path: 'CreateUser',
        loadComponent: () => import('./pages/create-user/create-user.component').then(c => c.CreateUserComponent)
    },
    {
        path: 'EditUser',
        loadComponent: () => import('./pages/create-user/create-user.component').then(c => c.CreateUserComponent)
    },
    {
        path: 'ErrorLogList',
        loadComponent: () => import('./pages/error-log-list/error-log-list.component').then(c => c.ErrorLogListComponent)
    },
];
