import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/login/login.component').then((l) => l.LoginComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((h) => h.HomeComponent)
    }
];
