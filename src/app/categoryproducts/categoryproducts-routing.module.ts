import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryproductsPage } from './categoryproducts.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryproductsPageRoutingModule {}
