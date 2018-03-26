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
import { BusquedaComponent } from './busqueda/busqueda.component';
import { BusquedaInboundComponent } from './busqueda-inbound/busqueda-inbound.component';

import { LoginComponent } from './login/login.component';
import { RegistrarPromocionComponent } from './registrar-promocion/registrar-promocion.component';
import { SearchResultsComponent } from './busqueda-resultados/search-results.component';

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
    },
    {
        path: 'busqueda',
        component: BusquedaComponent
    },
    {
        path: 'busqueda-inbound',
        component: BusquedaInboundComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registrar-promocion',
        component: RegistrarPromocionComponent
    },
    {
        path: 'busqueda-resultados',
        component: SearchResultsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTING)
    ],
    exports: [RouterModule]
})

export class AppRouting {}
