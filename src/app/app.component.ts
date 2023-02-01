import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular'
import { AuthServiceService } from './auth-service.service';
import { AdmincheckoutPage } from './admincheckout/admincheckout.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  isAdmin: boolean = false
  private angularFireStoreDocument: AngularFirestoreDocument
  getCartDetails: any = []
  getCurrentProductDetails: any = []
  total: number = 0;
  cartItem:number = 0
  getOrders: any = []
  meReference: AngularFirestoreDocument
  stockRefence: AngularFirestoreCollection
  myInformation: any = {}
  sub;
  fullname: any = ""
  constructor(private menuCtrl: MenuController, private router: Router,
    private alertCtrl: AlertController,
    private auth: AuthServiceService, private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore) {
        this.angularFireAuth.authState.subscribe(data => {
          if (data && data.uid) {
            if (data.displayName == 'admin') {
              this.isAdmin = true
            } else {
             this.isAdmin = false
              this.angularFireStoreDocument = this.angularFireStore.collection('users').doc(`${data.uid}`)
              
              this.sub = this.angularFireStoreDocument.valueChanges().subscribe(user => {
                this.fullname = user.Email
                // this.fullname = user.Email.substring(0, );

                  // this.fullname = this.fullname.split("@")
                  // this.fullname = this.fullname[0]

              })
             
            }
          }
        })

     }
    navigateToPOS() {
      this.router.navigateByUrl('/createpos')
    this.menuCtrl.close();
    }
  navigateToViewProduct() {
    this.router.navigateByUrl('/viewproducts')
    this.menuCtrl.close();
  }
  navigateToAddProduct() {
    this.router.navigateByUrl('/add-product')
    this.menuCtrl.close();
  }
  navigateToInventory() {
    this.router.navigateByUrl('/inventory')
    this.menuCtrl.close();
  }
  navigateToHistoryOrders() {
    this.router.navigateByUrl('/history')
    this.menuCtrl.close();
  }
  navigateToOrders() {
    this.router.navigateByUrl('/adminpage')
    this.menuCtrl.close();
  }

  navigateLogout() {
    this.alertCtrl.create({
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.auth.SignOut()

            this.menuCtrl.close();
          }
        },
        {
          text: 'No',
          role: "cancel"
        }
      ]
    }).then(el => {
      el.present()
    })


  }

  navigateToShop() {
    this.router.navigateByUrl('/home')
    this.menuCtrl.close();
  }

  navigateToEditInfo() {
    this.router.navigateByUrl('/editinfo')
    this.menuCtrl.close();
    
  }

 async openGcashModal() {
    const alert = await this.alertCtrl.create({
      header: 'You can pay via G cash. Just scan the qr code and when the delivery rider is already on your house, You need to show some proof that you have already paid your orders via gcash.',
      message: '<img src="https://ucarecdn.com/d356dac6-6f2f-4dd9-84c0-00ca43d7bd04/teajointsgcash.jpg" class="card-alert"/>',
      buttons: [
        {
          text: "Close",
          role: 'cancel'
        }
      ]
    })
    await alert.present()
  await this.menuCtrl.close();
  }
}
