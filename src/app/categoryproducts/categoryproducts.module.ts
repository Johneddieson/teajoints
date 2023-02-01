import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryproductsPageRoutingModule } from './categoryproducts-routing.module';

import { CategoryproductsPage } from './categoryproducts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryproductsPageRoutingModule
  ],
  declarations: [CategoryproductsPage]
})
export class CategoryproductsPageModule {}
