import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { InventoryDbComponent } from 'src/app/modules/inventory-db/inventory-db.component';
import { SurplusInventoryComponent } from 'src/app/modules/surplus-inventory/surplus-inventory.component';
import { CustomerOwnedPartsComponent } from 'src/app/modules/customer-owned-parts/customer-owned-parts.component';
import { ScrapModuleComponent } from 'src/app/modules/scrap-module/scrap-module.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    DefaultComponent,
    InventoryDbComponent,
    SurplusInventoryComponent,
    CustomerOwnedPartsComponent,
    ScrapModuleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule
  ]
})
export class DefaultModule { }
