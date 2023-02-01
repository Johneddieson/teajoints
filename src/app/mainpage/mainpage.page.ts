import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {

  @Input()title: string;
  dropdown = false;
  dropdownmobile = false;
  istrue;
  iconName = "chevron-up"

  @ViewChild('productbtn') productbtn: ElementRef;
  productCollection: AngularFirestoreCollection
sub
products: any[] = []
category = "";
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router : Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
      this.getAllProducts()
   }

   getAllProducts() {
    this.productCollection = !this.category ?  this.afstore.collection('Products') :     this.afstore.collection('Products', ref => ref.where("Category", "==", this.category))
    this.sub = this.productCollection.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      return {
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }
    }))).subscribe(data => {
     data = data.sort(function(a, b) {
        if (a.ProductName < b.ProductName) {
          return -1
        }
        if (a.ProductName > b.ProductName) {
          return 1
        }
        return 0
      })
      this.products = data
      //   var mappings = this.products.map( function(f) {return f.ImageUrl})
      //   var i = 0;
      //  var len = mappings.length
       
      //  setInterval(() => {
      //   if (i > len-1) {
      //    i = 0;
      //  }
      //  this.productbtn.nativeElement.src = mappings[i]
      //  i++;
      // }, 3000);
      })
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
          value: 'Sizzling Meal With Rice'
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
        {
          type: 'radio',
          label: 'Extras',
          value: 'Extras'
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

  ngOnInit() {
  }
  hideDropdown(event) {
    const xTouch = (event.clientX)
    const yTouch = (event.clientY)
    
    const rec = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rec.top+2
    const leftBoundary = rec.left+2
    const rightBoundary = rec.right-2
    
    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false
    }
    
      }
}
