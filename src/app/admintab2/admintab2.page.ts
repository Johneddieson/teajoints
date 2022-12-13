import { CurrencyPipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-admintab2',
  templateUrl: './admintab2.page.html',
  styleUrls: ['./admintab2.page.scss'],
})
export class Admintab2Page implements OnInit, OnChanges {
  onchangeQueryEvent: string;
  productReference: AngularFirestoreCollection
  sub
  allPendingOrders: any[] = []
  customerName: string = "";
  customerEmail: string = "";
  dateStart: string = "";
  dateEnd: string = "";
  status;
  inp_customerEmail: string = ""
  inp_startDate: string = "";
  inp_endDate: string = "";
  inp_status: string = ""
  @ViewChild(IonModal) modal: IonModal;
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController) {
  this.historyQuery();
  }

  ngOnInit() {
  }

ngOnChanges(changes: SimpleChanges): void {
    //this.historyQuery()
}
handleChangeStatus(event) { 
  const query = event.target.value.toLowerCase();
 this.inp_status = query == undefined ? "" : query
  this.historyQuery();
    
}
  handleChange(event) { 
    const query = event.target.value.toLowerCase();
    this.onchangeQueryEvent = query == undefined ? "" : query
    this.historyQuery();
      
  }

  handleChangeEmail(event) {
    const query = event.target.value.toLowerCase();
    this.inp_customerEmail = query == undefined ? "": query
    this.historyQuery();
  }
  handleChangeStartDate(event) {
    const query = event.target.value.toLowerCase();
    this.inp_startDate = query == undefined ? "" : query
    this.historyQuery();
  }
  handleChangeEndDate(event) {
    const query = event.target.value.toLowerCase();
    this.inp_endDate = query == undefined ? "" : query
    this.historyQuery();
  }
  close() {
    //this.datetime.cancel(true);
    this.modal.dismiss()
    this.customerName = this.customerName
    this.customerEmail = this.customerEmail
    this.dateStart = this.dateStart
    this.dateEnd = this.dateEnd  
    }

    historyQuery() {
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
                  Status: i.Status == "Closed" ? "Approved" : "Rejected",
                  TotalAmount: i.TotalAmount,
                  id: i.historyid,
                  DatetimeToSort: moment(i.Datetime).toDate(),
                  OrderDetails: i.OrderDetails,
                  BillingFullName: `${i.BillingFirstname} ${i.BillingLastname}`
                })
              })
              data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
                if (this.customerName != "")
                {
                  data = data.filter(f => f.BillingFullName.toLowerCase().includes(this.onchangeQueryEvent.toLowerCase())) 
                }
                if (this.customerEmail != "")
                {
                  data = data.filter(f => f.Billingemail.toLowerCase().includes(this.inp_customerEmail.toLowerCase())) 
                  
                }
                console.log("the stats", this.status)
                if (this.status != undefined) 
                {
                  data = data.filter(f => f.Status.includes(this.status)) 
                }

                if(this.dateStart != "" && this.dateEnd != "")
                {
              var startdate = this.dateStart + " 00:00"
              var enddate = this.dateEnd + " 23:59"
              data = data.filter(f => moment(moment(f.Datetime).format("MM-DD-YYYY hh:mm A")).toDate() >= moment(startdate).toDate() &&  moment(moment(f.Datetime).format("MM-DD-YYYY hh:mm A")).toDate() <= moment(enddate).toDate())
                }
              this.allPendingOrders = data
            })
        }
      })
    }
}
