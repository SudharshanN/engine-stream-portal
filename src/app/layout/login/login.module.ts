import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UesrLoginComponent } from 'src/app/pages/uesr-login/uesr-login.component';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    LoginComponent,
    UesrLoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class LoginModule { }
