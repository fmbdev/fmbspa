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
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: NewRegisterComponent
  },
  {
    path: 'form',
    component: FormComponent
  },

  {
    path: 'register-existing',
    component: NewRegisterExistingComponent
  },
  {
    path: 'register-existing-reception',
    component: NewRegisterExistingReceptionComponent
  },
  {
    path: 'referidoReferente',
    component: ReferidoReferenteComponent
  },

   {
    path: 'referidoPromotor',
    component: ReferidoPromotorComponent
  },
   {
    path: 'referidoTlmk',
    component: ReferidoTlmkComponent
  },
  {
    path: 'referidoWeb',
    component: ReferidoWebComponent
  },
  {
    path: 'registerPromotion',
    component: NewRegisterPromotionComponent
  },
  {
    path: 'registerSolo',
    component: NewRegisterSoloComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'searchInbound',
    component: SearchInboundComponent
  },
  {
    path: 'results',
    component: SearchResultsComponent
  },
  {
    path: 'upload',
    component: UploadBaseComponent
  },
  {
    path: 'upload-sis',
    component: UploadBaseSisComponent
  },
  {
    path: 'modal',
    component: ModalConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
