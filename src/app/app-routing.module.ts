import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { LoginComponent } from './layout/login/login.component';
import { BatchDetailsComponent } from './modules/batch-details/batch-details.component';
import { CustomerOwnedPartsComponent } from './modules/customer-owned-parts/customer-owned-parts.component';
import { InventoryDbComponent } from './modules/inventory-db/inventory-db.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { SalesHistoryComponent } from './modules/sales-history/sales-history.component';
import { ScrapModuleComponent } from './modules/scrap-module/scrap-module.component';
import { SurplusInventoryComponent } from './modules/surplus-inventory/surplus-inventory.component';
import { UesrLoginComponent } from './modules/uesr-login/uesr-login.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: InventoryDbComponent
  }, {
    path: 'surplus',
    component: SurplusInventoryComponent
  }, {
    path: 'ownedParts',
    component: CustomerOwnedPartsComponent
  }, {
    path: 'scrap',
    component: ScrapModuleComponent
  },
  {
    path: 'salesHistory/:id',
    component: SalesHistoryComponent
  },
  {
    path: 'batchDetails/:id',
    component: BatchDetailsComponent
  }]
}, {
  path: '',
  component : LoginComponent,
  children: [{
    path: 'login',
    component: UesrLoginComponent
  }, {
    path: '**',
    component: PageNotFoundComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
