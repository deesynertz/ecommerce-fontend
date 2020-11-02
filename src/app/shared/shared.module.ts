import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColomnOneComponent } from './layout/colomn-one/colomn-one.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [ColomnOneComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    CommonModule, RouterModule, AngularMaterialModule
  ],
  exports: [
    ColomnOneComponent
  ]
})
export class SharedModule { }
