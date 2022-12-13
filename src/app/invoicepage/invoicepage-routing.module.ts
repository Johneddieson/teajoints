import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicepagePage } from './invoicepage.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicepagePageRoutingModule {}
