import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { NuevoRegistroComponent } from './nuevo-registro/nuevo-registro.component';
import { NuevoRegistroSolovinoComponent } from './nuevo-registro-solovino/nuevo-registro-solovino.component';
import { GeneralComponent } from './general/general.component';
import { ReferidosComponent } from './referidos-referente/general.component';
import { ReferidosPromotorComponent } from './referidos-promotor/referidos-promotor.component';
import { ReferidosTlmkComponent } from './referidos-tlmk/referidos-tlmk.component';
import { ReferidosWebComponent } from './referidos-web/referidos-web.component';

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
    },
    {
        path: 'general',
        component: GeneralComponent
    },
    {
        path: 'referidos-referente',
        component: ReferidosComponent
    },
    {
        path: 'referidos-promotor',
        component: ReferidosPromotorComponent
    },
    {
        path: 'referidos-tlmk',
        component: ReferidosTlmkComponent
    },
    {
        path: 'referidos-web',
        component: ReferidosWebComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTING)
    ],
    exports: [RouterModule]
})

export class AppRouting {}
