import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { InventoryDbComponent } from 'src/app/pages/inventory-db/inventory-db.component';
import { SurplusInventoryComponent } from 'src/app/pages/surplus-inventory/surplus-inventory.component';
import { CustomerOwnedPartsComponent } from 'src/app/pages/customer-owned-parts/customer-owned-parts.component';
import { ScrapModuleComponent } from 'src/app/pages/scrap-module/scrap-module.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SalesHistoryComponent } from 'src/app/pages/sales-history/sales-history.component';
import { BatchDetailsComponent } from 'src/app/pages/batch-details/batch-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DefaultComponent,
    InventoryDbComponent,
    SurplusInventoryComponent,
    CustomerOwnedPartsComponent,
    ScrapModuleComponent,
    SalesHistoryComponent,
    BatchDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
