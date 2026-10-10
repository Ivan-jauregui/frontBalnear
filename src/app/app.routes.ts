import { Routes } from '@angular/router';

import { Home } from '../features/home/pages/home/home';

import { BalnearioList } from '../features/balneario/pages/balneario-list/balneario-list';
import { BalnearioDetail } from '../features/balneario/pages/balneario-detail/balneario-detail';

import { CreateBalneario } from '../features/balneario/pages/create-balneario/create-balneario';
import { UploadImage } from '../features/balneario/pages/upload-image/upload-image';

import {BookingReserve} from '../features/reservation/pages/booking-reserve/booking-reserve'

import { DashboardOwner } from '../features/dashboard/pages/dashboard-owner/dashboard-owner';

import { Login } from '../features/auth/pages/login/login';
import { Register } from '../features/auth/pages/register/register';


import { authGuard } from './core/guards/auth-guard'; 
import { SolicitudeList } from '../features/dashboard/pages/solicitude-list/solicitude-list';
import { SolicitudeDetails} from '../features/dashboard/pages/solitude-details/solitude-details';

export const routes: Routes = [
    { path: '', component: Home },

    // Lista de Balnearios y búsqueda
    { path: 'balnearios', component: BalnearioList },

    // Creación de Balnearios
    { path: 'balneario/create', component: CreateBalneario,  },

    { path: 'balneario/:id', component: BalnearioDetail },
    { path: 'balneario/:id/imagen', component: UploadImage, canActivate: [authGuard] },

    {path: 'reserve',component: BookingReserve},

    // Dashboard'
    { path: 'dashboard', component: DashboardOwner },
    { path: 'dashboard/solicitude', component: SolicitudeList },
    { path: 'dashboard/solicitude/details/:id', component: SolicitudeDetails },

    // Logeo y registro
    { path: 'login', component: Login },
    { path: 'register', component: Register },
];