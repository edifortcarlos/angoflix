import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((h) => h.HomeComponent),
        canActivate: [authGuard]
    },
    {
        path: 'movie/:id',
        loadComponent: () => import('./pages/movie-detail/movie-detail.component').then((m) => m.MovieDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full',
    }
];
