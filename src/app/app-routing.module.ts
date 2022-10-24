import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthForLoginSignupGuard } from './auth-for-login-signup.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mainpage',
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
    path: 'mainpage',
    loadChildren: () => import('./mainpage/mainpage.module').then( m => m.MainpagePageModule)
  },
  {
    path: 'productdetails/:id',
    loadChildren: () => import('./productdetails/productdetails.module').then( m => m.ProductdetailsPageModule),
  },
  {
    path: 'orderdetails/:id',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule),
    canActivate: [AuthGuard]
  },
 
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
