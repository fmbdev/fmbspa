// routerConfig.ts

import { Routes } from '@angular/router';
import { CreateContacComponent } from './contacto/create.component';

//import { EditComponent } from './components/contact/edit.component';
//import { IndexComponent } from './components/contact/index.component';

export const appRoutes: Routes = [
  { path: 'nuevo-registro-inbound', 
    component: CreateContacComponent 
  },
//  {
//    path: 'edit/:id',
//    component: EditComponent
//  },
//  { path: 'index',
//    component: IndexComponent
//  }
];