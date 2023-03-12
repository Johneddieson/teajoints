import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  getCartDetails: any = []
meReference: AngularFirestoreDocument
sub
firstname;
lastname;
address1;
address2;
phonenumber;
email;
isDisabled = true;
isEdit = false
name;

  constructor(private actRoute: ActivatedRoute, private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router,
    private http: HttpClient,
    private msg: MessengerService) {
      this.name = this.actRoute.snapshot.paramMap.get('name')
      this.afauth.authState.subscribe(async data => {
      if (data && data.uid) {
       
        this.meReference = this.afstore.doc(`users/${data.uid}`)
        this.sub = this.meReference.valueChanges().subscribe(data => {
            this.firstname = data.FirstName
            this.lastname = data.LastName
            this.email = data.Email
            this.address1 = data.Address1
            this.address2 = data.Address2
            this.phonenumber = `${data.PhoneNumber}`
        })

        //Reset all user address 1 and 2
        // this.afstore.collection('users').snapshotChanges()
        // .pipe(map(actions => actions.map(a => {
        //   return {
        //     id: a.payload.doc.id,
        //     ...a.payload.doc.data() as any
        //   }
        // })))
        // .subscribe(data => 
        //   {
        //     data.forEach(fe => {
        //       this.afstore.doc(`users/${fe.id}`).update({
        //         Address1: '',
        //         Address2: ''
        //       })
        //     })
        //   })
      }
    })
  }
async ngOnInit() {
}
//  async Edit() {
//     if (this.name == 'edit')
//     {
//       var cartArray = JSON.parse(sessionStorage.getItem('cart'));
      
//       var loadingCtrl = await this.loadingCtrl.create
//       ({
//         message: 'Editing Please Wait...',
//         spinner: 'bubbles'
//       })
//       await loadingCtrl.present();
//       var alertSuccess = await this.alertCtrl.create
//       ({
//         message: 'You edited your information successfully',
//         buttons: 
//         [
//           {
//             text: 'Ok',
//             role: 'cancel'
//           }
//         ]
//       })
//       setTimeout(async () => {
//         await loadingCtrl.dismiss();
//             this.meReference.update({
//               FirstName: this.firstname,
//               LastName: this.lastname,
//               Address1: this.address1,
//               Address2: this.address2,
//               PhoneNumber: this.phonenumber,
//             }).then(async success => {
//               await alertSuccess.present();
//               if (cartArray.length > 0) 
//               {
//                 this.router.navigateByUrl('/checkout'); 
//               }  
//             })
//       }, 2000);
//       }
//     else 
//     {
//       if (this.address1 === '' || this.address2 == '')
//       {
//           var errAlert = await this.alertCtrl.create
//           ({
//             message: `Address 1 and 2 should'nt be empty`,
//             buttons: [
//               {
//                 text: 'Ok',
//                 role: 'cancel'
//               }
//             ]
//           })
//           await errAlert.present()
//       }
//       else
//       {
//         this.loadingCtrl.create({
//           message: 'Editing Please Wait...'
//         }).then(loading => {
//           loading.present()
//           this.alertCtrl.create({
//             message: 'You edited your information successfully',
//             buttons: [
//               {
//                 text: 'Ok',
//                 role: 'cancel'
//               }
//             ]
//           }).then(alert => {
    
//          setTimeout(() => {
//           loading.dismiss()
//           alert.present()
//           this.meReference.update({
//             FirstName: this.firstname,
//             LastName: this.lastname,
//             Address1: this.address1,
//             Address2: this.address2,
//             PhoneNumber: this.phonenumber
//           })
//           this.router.navigateByUrl('/checkout')
//          }, 3000)
//           }).catch(alerterr => {
    
//           })
         
//         }).catch(loadingerr => {
    
//         })
//       }
//     }
//   }

  async Edit()
  {
var loadingController = await this.loadingCtrl.create
({
  message: 'Editing please wait...',
  spinner: 'dots'
})
await loadingController.present();
        var alertSuccess = await this.alertCtrl.create
        ({
          message: 'Changes has been saved.',
          buttons: 
          [
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        })
          setTimeout(async () => {
        await loadingController.dismiss();
            this.meReference.update({
              FirstName: this.firstname,
              LastName: this.lastname,
              Address1: '',
              Address2: '',
              PhoneNumber: this.phonenumber,
            }).then(async success => {
              await alertSuccess.present();  
            })
      }, 2000);
  }
  async getCurrentLocation()
  {
    var loading =  await this.loadingCtrl.create
    ({
      message: 'Getting your location...',
      spinner: 'bubbles'
    })
    await loading.present()
 navigator.geolocation.getCurrentPosition((success) => {
 //console.log("bobo", success)
  this.msg.myLoc(success.coords.latitude, success.coords.longitude).subscribe(async data  => 
    {
      //this is my current address
      var myaddress = data.Response.View[0].Result[0].Location.Address
      var myaddress2 = data.Response.View[0].Result[1].Location.Address
     // console.log("tang ina address ko to", myaddress)
        //this.address1 = `${myaddress.HouseNumber} ${myaddress.Street} ${myaddress.District} ${myaddress.City} ${myaddress.County}, ${myaddress.Label}`
        //this.address2 = `${myaddress2.HouseNumber} ${myaddress2.Street} ${myaddress2.District} ${myaddress2.City} ${myaddress2.County}, ${myaddress2.Label}`
        this.address1 = `${myaddress.Street} ${myaddress.District} ${myaddress.Label}`
        this.address2 = `${myaddress.Street} ${myaddress2.District} ${myaddress2.Label}`
        await loading.dismiss()
    
        var alertIfAddressIsWrong = await this.alertCtrl.create
        ({
          message: `If your current location doesn't correct, you can edit it manually.`,
          buttons: 
          [
            {
              text: 'Ok',
              role: 'cancel'              
            }
          ]          
        })
        await alertIfAddressIsWrong.present();
        this.isDisabled = false
      })
})
  }
}
