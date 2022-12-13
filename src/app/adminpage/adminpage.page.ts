import { LocationStrategy } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton, AlertController, IonDatetime, IonModal, Platform } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import {format, isThisMinute, parseISO} from 'date-fns'
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {
  modes = ['date', 'date-time', 'month', 'month-year', 'time', 'time-date', 'year'];
  selectedMode ='date'
  queryinput: string;
  showPicker: boolean = false;
  timeNow = format(new Date(), 'hh');
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  formattedString = ''
  customerName: string;
  customerEmail: string;
  dateStart: string;
  dateEnd: string;
  inp_customerEmail: string
  inp_startDate: string;
  inp_endDate: string;
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @ViewChild(IonModal) modal: IonModal;
  constructor(private locationStrategy: LocationStrategy,
    private alertCtrl: AlertController,
    private auth: AuthServiceService,
    private plt: Platform,
    private router: Router) {
      }

setToday() {
  this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd' + 'T09:00:00.000Z')), 'yyyy-MM-dd' + 'T09:00:00.000Z');
}
     public convertToPDF()
     {
     html2canvas(document.getElementById("invoice-POS")!).then(canvas => {
     const contentDataURL = canvas.toDataURL('image/png')
     let pdf = new jsPDF('l', 'mm', 'a4'); 
     var width = pdf.internal.pageSize.getWidth();
     var height = canvas.height * width / canvas.width;
     pdf.addImage(contentDataURL, 'PNG', 10, 10, width, height)
     
     pdf.addPage()

     const contentDataURL2 = canvas.toDataURL('image/png')
     var width2 = pdf.internal.pageSize.getWidth();
     var height2 = canvas.height * width2 / canvas.width;
     pdf.addImage(contentDataURL2, 'PNG', 10, 10, width2, height2)
     
     pdf.save('output.pdf'); 
     });
    }


  ngOnInit() {
  
    // history.pushState(null, null, location.href);
    // this.locationStrategy.onPopState(() => {
    //   history.pushState(null, null, location.href);
    // })
}
onChange(UpdatedValue : string) :void
  {
    this.queryinput = UpdatedValue;
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

handleChange(event) {
  const query = event.target.value.toLowerCase();
  this.queryinput = query == undefined ? "" : query
}
handleChangeEmail(event) {
  const query = event.target.value.toLowerCase();
  this.inp_customerEmail = query == undefined ? "": query
}
handleChangeStartDate(event) {
  const query = event.target.value.toLowerCase();
  this.inp_startDate = query == undefined ? "" : query

}
handleChangeEndDate(event) {
  const query = event.target.value.toLowerCase();
  this.inp_endDate = query == undefined ? "" : query
}
dateChanged(value) {
this.dateValue = value;
this.formattedString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
console.log("date value", this.formattedString)
console.log("date data type", typeof(this.formattedString))
this.showPicker = false;
}
select() {
//this.datetime.confirm(true);
this.modal.dismiss()
this.customerName = this.customerName
this.customerEmail = this.customerEmail
this.dateStart = this.dateStart
this.dateEnd = this.dateEnd

console.log("customer name", this.customerName)
console.log("customer email", this.customerEmail)
console.log("date start", this.dateStart)
console.log("date end", this.dateEnd)
}
close() {
//this.datetime.cancel(true);
this.modal.dismiss()
this.customerName = this.customerName
this.customerEmail = this.customerEmail
this.dateStart = this.dateStart
this.dateEnd = this.dateEnd

console.log("customer name", this.customerName)
console.log("customer email", this.customerEmail)
console.log("date start", this.dateStart)
console.log("date end", this.dateEnd)
}
}
