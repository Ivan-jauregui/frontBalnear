import { Routes } from '@angular/router';
import { Login } from '../features/auth/login/pages/login/login';
import { BalnearioList } from '../features/balneario/pages/balneario-list/balneario-list';
import { BalnearioDetail } from '../features/balneario/pages/balneario-detail/balneario-detail';
import { CreateBalneario } from '../features/balneario/pages/create-balneario/create-balneario';
import { UploadImage } from '../features/balneario/pages/upload-image/upload-image';
import { Home } from '../features/home/pages/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'balnearios', component: BalnearioList },
    { path: 'balneario/search/:id', component: BalnearioDetail },
    { path: 'balneario/create', component: CreateBalneario },
    { path: 'balneario/:id/imagen', component: UploadImage },
    { path: 'login', component: Login },
];
