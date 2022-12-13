import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicepagePageRoutingModule } from './invoicepage-routing.module';

import { InvoicepagePage } from './invoicepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicepagePageRoutingModule
  ],
  declarations: [InvoicepagePage]
})
export class InvoicepagePageModule {}
