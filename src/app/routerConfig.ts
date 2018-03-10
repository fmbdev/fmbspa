// routerConfig.ts

import { Routes } from '@angular/router';
import { CreateContacComponent } from './contacto/create.component';
import { Form1Component } from './form1/create.component';
import { Form2Component } from './form2/create.component';
import { Form5Component } from './form5/create.component';

//import { EditComponent } from './components/contact/edit.component';
//import { IndexComponent } from './components/contact/index.component';

export const appRoutes: Routes = [
  { path: 'nuevo-registro-inbound', 
    component: CreateContacComponent 
  },
  { path: 'referidos-promotor', 
    component: Form1Component 
  },
  { path: 'referidos-referente', 
    component: Form2Component 
  },
  { path: 'referidos-web', 
    component: Form2Component 
  }
//  {
//    path: 'edit/:id',
//    component: EditComponent
//  },
//  { path: 'index',
//    component: IndexComponent
//  }
];