import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { NuevoRegistroComponent } from './nuevo-registro/nuevo-registro.component';
import { NuevoRegistroSolovinoComponent } from './nuevo-registro-solovino/nuevo-registro-solovino.component';

export const APP_ROUTING: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'nuevo-registro',
        component: NuevoRegistroComponent
    },
    {
        path: 'nuevo-registro-solovino',
        component: NuevoRegistroSolovinoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTING)
    ],
    exports: [RouterModule]
})

export class AppRouting {}
