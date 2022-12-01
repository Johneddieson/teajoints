import { CurrencyPipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-admintab2',
  templateUrl: './admintab2.page.html',
  styleUrls: ['./admintab2.page.scss'],
})
export class Admintab2Page implements OnInit {
  onchangeQueryEvent: string;
  productReference: AngularFirestoreCollection
  sub
  allPendingOrders: any[] = []
  
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.productReference = this.afstore.collection('History')

        this.sub = this.productReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              historyid: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {

            console.log("all orders", data)

            data = data.map((i, index) => {
              return Object.assign({
                BillingAddress1: i.BillingAddress1,
                BillingAddress2: i.BillingAddress2,
                BillingFirstname: i.BillingFirstname,
                BillingIndexId: i.BillingIndexId,
                BillingLastname: i.BillingLastname,
                BillingPhonenumber: i.BillingPhonenumber,
                Billingemail: i.Billingemail,
                Datetime: i.Datetime,
                Status: i.Status == "Closed" ? "Approved" : "Cancelled",
                TotalAmount: i.TotalAmount,
                id: i.historyid,
                DatetimeToSort: i.DatetimeToSort,
                OrderDetails: i.OrderDetails
              })
            })
            data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))

            console.log("the data", data)
            this.allPendingOrders = data
          })
      }
    })
  }

  ngOnInit() {
  }


  handleChange(event) { 
    const query = event.target.value.toLowerCase();
    this.onchangeQueryEvent = query
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.productReference = this.afstore.collection('History')

        this.sub = this.productReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              historyid: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {


            data = data.map((i, index) => {
              return Object.assign({
                BillingAddress1: i.BillingAddress1,
                BillingAddress2: i.BillingAddress2,
                BillingFirstname: i.BillingFirstname,
                BillingIndexId: i.BillingIndexId,
                BillingLastname: i.BillingLastname,
                BillingPhonenumber: i.BillingPhonenumber,
                Billingemail: i.Billingemail,
                Datetime: i.Datetime,
                Status: i.Status == "Closed" ? "Approved" : "Cancelled",
                TotalAmount: i.TotalAmount,
                id: i.historyid,
                DatetimeToSort: i.DatetimeToSort,
                OrderDetails: i.OrderDetails,
                BillingFullName: `${i.BillingFirstname} ${i.BillingLastname}`
              })
            })
            data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
               data = this.onchangeQueryEvent == undefined || this.onchangeQueryEvent == "" ? data :
               data.filter(f => f.BillingFullName.toLowerCase().includes(this.onchangeQueryEvent) 
            || f.Billingemail.toLowerCase().includes(this.onchangeQueryEvent)
            || f.Status.toLowerCase().includes(this.onchangeQueryEvent))   
       
            this.allPendingOrders = data
          })
      }
    })
  
  
  
  
  }


}
