import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
import { AlertController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admintab3',
  templateUrl: './admintab3.page.html',
  styleUrls: ['./admintab3.page.scss'],
})
export class Admintab3Page implements OnInit {
  inventoryReference: AngularFirestoreCollection
  productReference : AngularFirestoreDocument
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
@ViewChild(IonModal) modal: IonModal;
  constructor(private afauth: AngularFireAuth,
    private afstore: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router) {
    this.retrieveInventoryList();
     }
 
     handleChange(event) {
      const query = event.target.value.toLowerCase();
      this.onchangeQueryEvent = query
      
      //this.retrieveInventoryList(this.onchangeQueryEvent)
     }

  ngOnInit() {
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
        }))).subscribe( data => {  
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
            console.log("the data", data)
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
            // data = query == undefined || query == '' ? data : data.filter(f => f.ProductName.toLowerCase().includes(query)
            // || f.Destination.toLowerCase().includes(query))
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
}
