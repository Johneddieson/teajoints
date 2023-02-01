import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { AlertController, IonModal, IonSlides, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admintab3',
  templateUrl: './admintab3.page.html',
  styleUrls: ['./admintab3.page.scss'],
})
export class Admintab3Page implements OnInit {
  inventoryReference: AngularFirestoreCollection
  productReference : AngularFirestoreCollection
  sub;
  sub2;
  productname;
  onchangeQueryEvent: string;
inventoryList: any[] = []
inventoryList2: any[] = []
productObject 
fullName: string = ""
nameofProduct: string = ""
dateStart: string = ""
dateEnd: string = ""
categoryList: any[] = []
@ViewChild(IonModal) modal: IonModal;
@ViewChild('slides') slides: IonSlides;
option = 
{
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  spaceBetween: 10,
  //autoplay: true
}
  constructor(private afauth: AngularFireAuth,
    private afstore: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router,
    public loadingController: LoadingController) {
    //this.retrieveInventoryList();
    
     }
 
     handleChange(event) {
      const query = event.target.value.toLowerCase();
      this.onchangeQueryEvent = query
      
      //this.retrieveInventoryList(this.onchangeQueryEvent)
     }

  ngOnInit() {
    this.retrieveProducts()
  }
  handleFullNameChange(event)
  {
    this.retrieveInventoryList()
  }
  handleproductName(event)
  {
    this.retrieveInventoryList()  
  }
  handleChangeStartDate(event)
  {
    this.retrieveInventoryList()
  }
  retrieveInventoryList() {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        
        this.inventoryReference = this.afstore.collection('Inventory')
        this.sub = this.inventoryReference.snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))).subscribe(data => {  
         data =  data.map((i, index) => {
              return Object.assign({
                id: i.id,
                Datetime: i.Datetime,
                DatetimeToSort: i.DatetimeToSort,  
                Destination: i.Destination,
                ImageUrl: i.ImageUrl,
                read: i.read,
                Quantity: i.Quantity,
                UnitPrice: i.UnitPrice,
                ProductName:  i.ProductName
              })
            })
            data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
            if (this.fullName != "")
            {
              data = data.filter(f => f.Destination.toLowerCase().includes(this.fullName.toLowerCase()))
            }
            if (this.nameofProduct != "")
            {
              data = data.filter(f => f.ProductName.toLowerCase().includes(this.nameofProduct.toLowerCase()))     
            }  
            if (this.dateStart != "" && this.dateEnd != "")
            {
              var startdate = this.dateStart + " 00:00"
              var enddate = this.dateEnd + " 23:59"
              data = data.filter(f => moment(moment(f.Datetime).format("MM-DD-YYYY hh:mm A")).toDate() >= moment(startdate).toDate() &&  moment(moment(f.Datetime).format("MM-DD-YYYY hh:mm A")).toDate() <= moment(enddate).toDate())
            }
            this.inventoryList = data
          })
      }
    })
  }
  close() {
    //this.datetime.cancel(true);
    this.modal.dismiss()
    this.fullName = this.fullName
    this.nameofProduct = this.nameofProduct
    this.dateStart = this.dateStart
    this.dateEnd = this.dateEnd  
    }

  async retrieveProducts()
  {
     var theCategories = 
     [
      
      {
        name: 'Frappe',
        Image: 'https://cdn-icons-png.flaticon.com/512/190/190942.png'
      },
      {
        name: 'Milktea',
        Image: 'https://cdn-icons-png.flaticon.com/512/4645/4645898.png'
      },
      {
        name: 'Noodles',
        Image: 'https://cdn-icons-png.flaticon.com/512/3041/3041130.png'
      },
      {
        name: 'Pares',
        Image: 'https://cdn-icons-png.flaticon.com/512/3143/3143643.png'
      },

      {
        name: 'Platters',
        Image: 'https://cdn-icons-png.flaticon.com/512/2960/2960533.png'
      },

      {
        name: 'Shakes',
        Image: 'https://cdn-icons-png.flaticon.com/512/2234/2234936.png'
      },

      {
        name: 'Silog Meals',
        Image: 'https://cdn-icons-png.flaticon.com/512/4192/4192361.png'
      },
      {
        name: 'Sizzling Meal With Rice',
        Image: 'assets/icon/sizzlingsisig.png'
      },

      {
        name: 'Snacks',
        Image: 'https://cdn-icons-png.flaticon.com/512/859/859293.png'
      },

      {
        name: 'Rice Meal',
        Image: 'https://cdn-icons-png.flaticon.com/512/2515/2515189.png'
      },
      {
        name: 'Extras',
        Image: 'https://cdn-icons-png.flaticon.com/512/5579/5579400.png'
      },


     ]
     const sortAscending = theCategories.sort((a, b) => {
      return a.name.localeCompare(b.name);
     })
      this.categoryList = sortAscending
    }

    async next() 
    {
     await this.slides.slideNext()
    }
    async prev()
    {
      await this.slides.slidePrev()
    }
    async gotoThisCategory(name)
    {
      await this.router.navigateByUrl(`/category/${name}`)
    }
}
