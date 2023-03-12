import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthForLoginSignupGuard } from './auth-for-login-signup.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'none',
    redirectTo: '',
    pathMatch: 'full',
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
   
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'adminpage',
    loadChildren: () => import('./adminpage/adminpage.module').then( m => m.AdminpagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import("./admintab1/admintab1.module").then(m => m.Admintab1PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'viewproducts',
    loadChildren: () => import('./viewproducts/viewproducts.module').then( m => m.ViewproductsPageModule),
    canActivate: [AuthGuard]
 
  },
  {
    path: 'editproduct/:id',
    loadChildren: () => import('./editproduct/editproduct.module').then( m => m.EditproductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'createpos',
    loadChildren: () => import('./createpos/createpos.module').then( m => m.CreateposPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'admincheckout',
    loadChildren: () => import('./admincheckout/admincheckout.module').then( m => m.AdmincheckoutPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: '',
    loadChildren: () => import('./mainpage/mainpage.module').then( m => m.MainpagePageModule)
  },
  {
    path: 'productdetails/:id',
    loadChildren: () => import('./productdetails/productdetails.module').then( m => m.ProductdetailsPageModule),
  },
  {
    path: 'orderdetails/:id/:name',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'history',
    loadChildren: () => import("./admintab2/admintab2.module").then(m => m.Admintab2PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory',
    loadChildren: () => import("./admintab3/admintab3.module").then(m => m.Admintab3PageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'notifications',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'editinfo',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'invoicepage/:id/:name/:type',
    loadChildren: () => import('./invoicepage/invoicepage.module').then( m => m.InvoicepagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category/:name',
    loadChildren: () => import('./categoryproducts/categoryproducts.module').then( m => m.CategoryproductsPageModule)
  },

 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
