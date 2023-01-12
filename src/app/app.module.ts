import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthServiceService} from '../app/auth-service.service';
import { AuthGuard } from './auth.guard';
import {HttpClientModule } from '@angular/common/http';
import { AuthForLoginSignupGuard } from './auth-for-login-signup.guard';
import { CurrencyPipe } from '@angular/common';
import { AdminpagePage } from './adminpage/adminpage.page';
import { Admintab1Page } from './admintab1/admintab1.page';
import { AdmincheckoutPage } from './admincheckout/admincheckout.page';
@NgModule({
  
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAL9Lw2b3eeweS0ePOjY9l86Dr-iMC8EpM",
      authDomain: "teajointswingsandsnacks.firebaseapp.com",
      projectId: "teajointswingsandsnacks",
      storageBucket: "teajointswingsandsnacks.appspot.com",
      messagingSenderId: "759068302345",
      appId: "1:759068302345:web:50e19be44bd88c59912cd8",
      measurementId: "G-B9D63X54DV"
    }),
    
    AngularFirestoreModule,
  HttpClientModule,],
  declarations: [AppComponent,
    AdmincheckoutPage],
  providers: [CurrencyPipe, AuthForLoginSignupGuard, AuthGuard, AuthServiceService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
