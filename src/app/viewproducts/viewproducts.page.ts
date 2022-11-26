import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.page.html',
  styleUrls: ['./viewproducts.page.scss'],
})
export class ViewproductsPage implements OnInit {
  productReference: AngularFirestoreCollection
  sub
  products: any[] = []
  @Input() title: string;
  public id: string
  dropdown = false;
  category = "";
  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private actRoute: ActivatedRoute) {

    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {   
        this.getAllProducts()     
      }
    })
  }
  getAllProducts() {
    
    this.productReference = !this.category ? this.afstore.collection('Products') : this.afstore.collection('Products', ref => ref.where("Category", "==", this.category))
         
  this.sub = this.productReference.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      return {
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }
    }))
  ).subscribe(data => {
    this.products = data
  })
  }
  async loadProducts() {
    var loading = await this.loadingCtrl.create({
       message: 'Loading...',
       spinner: 'bubbles'
     });
     await loading.present()
   setTimeout(() => {
     loading.dismiss()
   }, 300)
   }
  async  SearchCategory() {
    var alert =  this.alertCtrl.create({
      header: 'Choose Category',
      inputs: [
        {
          type: 'radio',
          label: '--SHOW ALL--',
          value: ''
        },
        {
          type: 'radio',
          label: 'Frappe',
          value: 'Frappe'
        },
        {
          type: 'radio',
          label: 'Milktea',
          value: 'Milktea'
        },
        {
          type: 'radio',
          label: 'Noodles',
          value: 'Noodles'
        },
        {
          type: 'radio',
          label: 'Pares',
          value: 'Pares'
        },
        {
          type: 'radio',
          label: 'Platters',
          value: 'Platters'
        },
       
        {
          type: 'radio',
          label: 'Shakes',
          value: 'Shakes'
        },
        {
          type: 'radio',
          label: 'Silog Meals',
          value: 'Silog Meals'
        },
        {
          type: 'radio',
          label: 'Sizzling Meal W Rice',
          value: 'Sizzling Meal W/ Rice'
        },
        {
          type: 'radio',
          label: 'Snacks',
          value: 'Snacks'
        },
        {
          type: 'radio',
          label: 'Rice Meal',
          value: 'Rice Meal'
        },
      ],
      buttons: [
        {
          text: 'Search',
          handler: data => {
            this.category = data
            this.loadProducts()
            
            setTimeout(() => {
              this.getAllProducts()
            }, 500)
            
          }
        },
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    });
    (await alert).present()
   }
  ngOnInit() {
  }
  DeleteProduct(data) {
    this.alertCtrl.create({
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")

            this.afstore.collection('Inventory').add({
              Quantity: parseInt(data.Stock) * -1,
              Datetime: datetime,
              read: false,
              Destination: "Admin",
              ProductName: data.ProductName,
              UnitPrice: data.UnitPrice,
              ImageUrl: data.ImageUrl
            })
            this.afstore.doc(`Products/${data.id}`).delete()
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(el => {
      el.present()
    })

  }

  EditProduct(data) {
    this.router.navigateByUrl(`/editproduct/${data.id}`)

  }
  hideDropdown(event) {
    const xTouch = (event.clientX)
    const yTouch = (event.clientY)

    const rec = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rec.top + 2
    const leftBoundary = rec.left + 2
    const rightBoundary = rec.right - 2

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false
    }

  }

}
