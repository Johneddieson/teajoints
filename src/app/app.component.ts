import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular'
import { AuthServiceService } from './auth-service.service';
import { AdmincheckoutPage } from './admincheckout/admincheckout.page';
import { map } from 'rxjs/operators';
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
  mesub;
  constructor(private menuCtrl: MenuController, private router: Router,
    private alertCtrl: AlertController,
    private auth: AuthServiceService, private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    ) {
        this.angularFireAuth.authState.subscribe(data => {
          if (data) {
            if (data.displayName == 'admin') 
            {
              this.isAdmin = true
              this.angularFireStoreDocument = this.angularFireStore.collection('users').doc(`${data.uid}`)
            } 
            else 
            {
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

 async navigateLogout() {
   
  var alertForLogout = await this.alertCtrl.create
  ({
    message: 'Are you sure you want to logout?',
    buttons: 
    [
      {
        text: 'Yes',
        handler: () => 
        {
                  this.angularFireStoreDocument.update({
                    Address1: '',
                    Address2: ''
                  })
                  this.auth.SignOut()
                  this.menuCtrl.close();
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }
    ]
  })
  await alertForLogout.present();
  // this.alertCtrl.create({
    //   message: 'Are you sure you want to logout?',
    //   buttons: [
    //     {
    //       text: 'Yes',
    //       handler: () => {
    //         this.angularFireStoreDocument.update({
    //           Address1: '',
    //           Address2: ''
    //         })
    //         this.auth.SignOut()
    //         this.menuCtrl.close();
    //       }
    //     },
    //     {
    //       text: 'No',
    //       role: "cancel"
    //     }
    //   ]
    // }).then(el => {
    //   el.present()
    // })


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
  containsOnlyNumbers(str) {
    return /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(str);
  }
  async addMaterialModal()
  {
    this.menuCtrl.close();
    var addMaterialAlert = await this.alertCtrl.create
    ({
      header: 'Add Material',
      inputs: 
      [
        {
          type: 'text',
          name: 'Itemname',
          label: 'Itemname',
          placeholder: 'Please enter itemname'
        },
        {
          type: 'number',
          name: 'Stock',
          label: 'Stock',
          placeholder: 'Please enter stock'
        }
      ],
      buttons: 
      [
        {
          text: 'Add',
          handler:  (data) => 
          {
          //  console.log("data", data)
        
          this.angularFireStore.collection('Materials').get()
          .pipe(map(actions => {
            var tempdoc = actions.docs.map((doc) => {
              return {id: doc.id, ...doc.data() as any}
            })
            return tempdoc
          })).subscribe(existingmaterials => 
            {
              if (data.Itemname == '' && data.Stock == '')
              {
                  alert("Itemname and Stock shouldn't be empty")
              }
              else if (data.Itemname == '')
              {
                alert("Itemname shouldn't be empty")
              }
              else if (data.Stock == '')
              {
                alert("Stock shouldn't be empty")
              }
              else 
              {
                var existing = existingmaterials.filter(f => f.Itemname.toLowerCase().replace(/\s+/g, '') == data.Itemname.toLowerCase().replace(/\s+/g, ''))
                if (existing.length > 0)
                {
                  alert("Itemname already exists.")
                }
                else 
                {
          this.angularFireStore
       .collection('Materials')
       .add({
         Itemname: data.Itemname,
         Stock: parseInt(data.Stock),
       })
       .then(async (success) => {
         var MaterialsSavedAlert = await this.alertCtrl.create({
           message: 'Material added successfully!',
           backdropDismiss: false,
           buttons: [
             {
               text: 'Close',
               role: 'cancel',
             },
           ],
         });
         await MaterialsSavedAlert.present();
       })
       .catch((err) => {
         alert(JSON.stringify(err));
       });
              }
            }
            })
          }
        },
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    })
    await addMaterialAlert.present(); 
  }
}
