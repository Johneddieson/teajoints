import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton, AlertController, Platform } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {

  constructor(private locationStrategy: LocationStrategy,
    private alertCtrl: AlertController,
    private auth: AuthServiceService,
    private plt: Platform,
    private router: Router) { }

  ngOnInit() {
  
    // history.pushState(null, null, location.href);
    // this.locationStrategy.onPopState(() => {
    //   history.pushState(null, null, location.href);
    // })
}

approveOrder(data) {
  console.log("approved", data)
}
cancelOrder(data) {
  console.log("cancelled", data)
}
logout() {
this.alertCtrl.create({
  message: 'Are you sure you want to logout?',
  buttons: [
    {
      text: 'Yes',
      handler: () => {
        this.auth.SignOut()
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

addproduct() {
  this.alertCtrl.create({
    header: 'Choose',
    inputs: [
      {
        type: 'radio',
        label: 'POS',
        value: 'POS'

      },
      {
        type: 'radio',
        label: 'View Products',
        value: 'View Products'

      },
      {
        type: 'radio',
        label: 'Add Product',
        value: 'Add Product'

      },
      {
        type: 'radio',
        label: 'Log out',
        value: 'Log out',

      }
    ],
    buttons: [
      {
        text: 'Go',
        handler: data => {
          console.log("data", data)
          if (data == "View Products") {
            this.router.navigateByUrl('/viewproducts')  
          } else if (data == "Add Product") {

            this.router.navigateByUrl('/add-product')
          } else if (data == "POS") {
            this.router.navigateByUrl('/createpos')
          } else if (data == "Log out") {
            this.logout()
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  }).then(el => {
    el.present()
  })
}
}
