import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { NewRegisterPromotionComponent } from './new-register-promotion/new-register-promotion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { UploadBaseComponent } from './upload-base/upload-base.component';
import { UploadBaseSisComponent } from './upload-base-sis/upload-base-sis.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { NewRegisterSoloComponent} from './new-register-solo/new-register-solo.component';
import { SearchInboundComponent} from "./search-inbound/search-inbound.component";
import { ModalConfirmComponent} from "./modal-confirm/modal-confirm.component";
import { ReferidoReferenteComponent } from './referido-referente/referido-referente.component';
import { ReferidoPromotorComponent } from './referido-promotor/referido-promotor.component';
import { ReferidoTlmkComponent } from './referido-tlmk/referido-tlmk.component';
import { ReferidoWebComponent } from './referido-web/referido-web.component';
import { NewRegisterExistingComponent } from './new-register-existing/new-register-existing.component';
import { NewRegisterExistingReceptionComponent } from './new-register-existing-reception/new-register-existing-reception.component';
import { NewRegisterExistingSoloComponent } from './new-register-existing-solo/new-register-existing-solo.component';
import { FormComponent } from './form/form.component';
import { 
  AuthGuardService as AuthGuard 
} from './providers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: NewRegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: FormComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'register-existing',
    component: NewRegisterExistingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-existing-solo',
    component: NewRegisterExistingSoloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-existing-reception',
    component: NewRegisterExistingReceptionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'referidoReferente',
    component: ReferidoReferenteComponent,
    canActivate: [AuthGuard]
  },

   {
    path: 'referidoPromotor',
    component: ReferidoPromotorComponent,
    canActivate: [AuthGuard]
  },
   {
    path: 'referidoTlmk',
    component: ReferidoTlmkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'referidoWeb',
    component: ReferidoWebComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registerPromotion',
    component: NewRegisterPromotionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registerSolo',
    component: NewRegisterSoloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'searchInbound',
    component: SearchInboundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'results',
    component: SearchResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: UploadBaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload-sis',
    component: UploadBaseSisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modal',
    component: ModalConfirmComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
