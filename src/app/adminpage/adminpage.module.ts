import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminpagePageRoutingModule } from './adminpage-routing.module';

import { AdminpagePage } from './adminpage.page';
import { Admintab1Page } from '../admintab1/admintab1.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminpagePageRoutingModule
  ],
  declarations: [AdminpagePage, Admintab1Page]
})
export class AdminpagePageModule {}
