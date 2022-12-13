import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-invoicepage',
  templateUrl: './invoicepage.page.html',
  styleUrls: ['./invoicepage.page.scss'],
})
export class InvoicepagePage implements OnInit {
  id;
  orderDetails: AngularFirestoreDocument
  orders : any[] = []
  currentStock: any[] = []
  sub
  currentProductStockReference: AngularFirestoreCollection
  sub2
  data: any
  total;
  firstname;
  lastname;
  address1;
  address2;
  phonenumber;
  status;
  email;
  name;
  subtotal;
  deliveryfee;
  dateOrdered;
  dateOrdered2;
  invoiceDate;
  constructor(private actRoute: ActivatedRoute,
    private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController,
    private http: HttpClient) {
this.afauth.authState.subscribe(user => {
  if (user.uid && user) {
    this.name = this.actRoute.snapshot.paramMap.get('name')
    this.id = this.actRoute.snapshot.paramMap.get('id')

    
    this.orderDetails = this.name == 'orders' ? this.afstore.collection('Orders').doc(this.id) : this.afstore.collection('History').doc(this.id)

    // this.sub = this.orderDetails.valueChanges().subscribe(data => {
    //   console.log("haha", data)
    //   this.orders = data.OrderDetails;
    // })
    this.sub = this.orderDetails.snapshotChanges()
    .pipe(map(actions => {
return {
  id: actions.payload.id,
  ...actions.payload.data() as any
}

    })).subscribe(data => {
        console.log("haha", data)
      this.orders = data.OrderDetails;
      this.data = data
      this.total =  data.TotalAmount;
      this.subtotal = data.Billingemail.toUpperCase() != "WALK-IN" ? data.TotalAmount - 30 : data.TotalAmount  
      this.firstname = data.BillingFirstname
      this.lastname = data.BillingLastname
      this.address1 = data.BillingAddress1
      this.address2 = data.BillingAddress2
      this.status = data.Status
      this.phonenumber = data.BillingPhonenumber.toString().toUpperCase() == "WALK-IN" ? "Walk-In" : "0" + data.BillingPhonenumber
      this.email = data.Billingemail
      this.deliveryfee = data.Billingemail.toUpperCase() != "WALK-IN" ? 30 : 0
      
      this.dateOrdered = moment(data.Datetime).format("MM-DD-YYYY hh:mm A")
      this.invoiceDate = moment(new Date()).format("MM-DD-YYYY hh:mm A")
      this.dateOrdered2 = moment(data.Datetime).format("MM-DD-YYYY")
    })
  } 
})
   }
  ngOnInit() {
  }
  public convertToPDF()
  {
  html2canvas(document.getElementById("invoice")!).then(canvas => {
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jsPDF('l', 'mm', 'a4'); 
  var width = pdf.internal.pageSize.getWidth();
  //var height = canvas.height * width / canvas.width;
  //console.log("the height", height)
  pdf.addImage(contentDataURL, 'PNG', 10, 10, width, 209.90)
  
   pdf.addPage()

  const contentDataURL2 = canvas.toDataURL('image/png')
  var width2 = pdf.internal.pageSize.getWidth();
  //var height2 = canvas.height * width2 / canvas.width;
  pdf.addImage(contentDataURL2, 'PNG', 10, 10, width2, 209.90)
  
  
  pdf.addPage()

  const contentDataURL3 = canvas.toDataURL('image/png')
  var width3 = pdf.internal.pageSize.getWidth();
  //var height3 = canvas.height * width3 / canvas.width;
  pdf.addImage(contentDataURL3, 'PNG', 10, 10, width3, 209.90)
  var fullname = this.firstname + " " + this.lastname
  // pdf.save('output.pdf');
  pdf.save(`${fullname} - ${this.dateOrdered2}`); 
  });
 }
}
