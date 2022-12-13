import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController, IonAccordionGroup } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';
import * as firebase from 'firebase/app'
import { Button } from 'protractor';
import { Action } from 'rxjs/internal/scheduler/Action';
import { isSymbol } from 'util';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admintab1',
  templateUrl: './admintab1.page.html',
  styleUrls: ['./admintab1.page.scss'],
})
export class Admintab1Page implements OnInit {
  myquery = ""
  inp_customerEmail = "";
  inp_startDate = "";
  inp_endDate = "";
  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;
  @Input() set categoryId(value: string) {
    this.myquery = value == undefined ? "" : value
  }
  @Input() set customerEmail(value: string) {
    this.inp_customerEmail = value == undefined ? "" : value
  }
  @Input() set startDate(value: string) {
     this.inp_startDate = value == undefined ? "" : value
   }
   @Input() set endDate(value: string) {
     this.inp_endDate = value == undefined ? "" : value
   }

  changes = ""
  productReference: AngularFirestoreCollection
  currentProductStockReference: AngularFirestoreCollection
  sub
  sub2
  public allPendingOrders: any[] = []
  currentStock: any[] = []
  page = 0
  users = []
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController,
    private http: HttpClient) {
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
       
    //     this.productReference = this.afstore.collection('Orders', ref => ref.where("Status", "==", "Open")) 

    //     this.sub = this.productReference.snapshotChanges()
    //       .pipe(map(actions => actions.map(a => {
    //         return {
    //           id: a.payload.doc.id,
    //           ...a.payload.doc.data() as any
    //         }
    //       }))).subscribe(data => {
    //         console.log("orders", data)  
    //         data = data.map((i, index) => {
    //           return Object.assign({
    //             BillingAddress1: i.BillingAddress1,
    //             BillingAddress2: i.BillingAddress2,
    //             BillingFirstname: i.BillingFirstname,
    //             BillingIndexId: i.BillingIndexId,
    //             BillingLastname: i.BillingLastname,
    //             BillingPhonenumber: "0" + i.BillingPhonenumber,
    //             Billingemail: i.Billingemail,
    //             Datetime: i.Datetime,
    //             Status: i.Status,
    //             TotalAmount: i.TotalAmount,
    //             id: i.id,
    //             DatetimeToSort: i.DatetimeToSort,
    //             OrderDetails: i.OrderDetails,
    //             BillingFullName: `${i.BillingFirstname} ${i.BillingLastname}`
    //           })
    //         })
    //         data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
    //         this.allPendingOrders = data
           
    //       })
    //   }
    // })
  }
  get categoryId(): string {
    return this.myquery;
}
get customerEmail(): string {
  return this.inp_customerEmail;
}
get startDate(): string {
  return this.inp_startDate;
}
get endDate(): string {
  return this.inp_endDate;
}
  ngOnChanges(changes: SimpleChanges) {
 console.log("fullname", this.categoryId)
 console.log("email", this.customerEmail)
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
       
        this.productReference = this.afstore.collection('Orders', ref => ref.where("Status", "==", "Open")) 

        this.sub = this.productReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
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
                BillingPhonenumber: "0" + i.BillingPhonenumber,
                Billingemail: i.Billingemail,
                Datetime: i.Datetime,
                Status: i.Status,
                TotalAmount: i.TotalAmount,
                id: i.id,
                DatetimeToSort: i.DatetimeToSort,
                OrderDetails: i.OrderDetails,
                BillingFullName: `${i.BillingFirstname} ${i.BillingLastname}`
              })
            })
            data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
     
              if (this.categoryId != "") 
            {
              data = data.filter(f => f.BillingFullName.toLowerCase().includes(this.categoryId))
            } 
            if (this.customerEmail != "") 
            {
              data = data.filter(f => f.Billingemail.toLowerCase().includes(this.customerEmail))
            }
            if (this.inp_startDate != "" && this.inp_endDate != "")
            {
              var startdate = this.inp_startDate + " 00:00"
              var enddate = this.inp_endDate + " 23:59"
              data = data.filter(f => moment(moment(f.Datetime).format("MM-DD-YYYY hh:mm A")).toDate() >= moment(startdate).toDate() &&  moment(moment(f.Datetime).format("MM-DD-YYYY hh:mm A")).toDate() <= moment(enddate).toDate())
            }
            console.log("the data", data)
            console.log("converted date", data.map(function(i)  {var datetime = moment(i.Datetime).format("DD-MM-YYYY hh:mm A"); return moment(datetime).toDate()})) 
            this.allPendingOrders = data
          })
      }
    })
   
  }
  ngOnInit() {
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
        // {
        //   type: 'radio',
        //   label: 'Edit Information',
        //   value: 'Edit Information'

        // },
        // {
        //   type: 'radio',
        //   label: 'Change Password',
        //   value: 'Change Password'

        // },
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

  closeAccordion() {
    this.accordionGroup.value = ''
    
  }
  toggleSection() {
    this.accordionGroup.value = 'frameworks'
  }
  
  approveOrder(data) {
this.currentProductStockReference = this.afstore.collection('Products')

          this.sub2 = this.currentProductStockReference.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))
          ).subscribe(dataCurrentStock => {
             const mergeById = (array1, array2) =>
             array2.map(itm => ({
                ...Object.assign({}, itm, {
                 //Stock: array2.find((item) => (item.id === itm.id) && item).Stock,
                 Stock: array1.find((item) => (item.id === itm.id) && item).Stock,
                 Category: itm.Category,
                 ImageUrl: itm.ImageUrl,
                 ProductName: itm.ProductName,
                 Quantity: itm.Quantity,
                 UnitPrice: itm.UnitPrice,
                 id: itm.id                
               })
            }));

           var results = mergeById(dataCurrentStock, data.OrderDetails)
            this.currentStock = results
            
        })

        this.alertCtrl.create({
          header: 'Question',
          message: 'Are you sure you want to approve this order?',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                var filterGreaterThanStock = this.currentStock.filter(f => f.Quantity > f.Stock)   
                if (filterGreaterThanStock.length > 0) {
    
                  alert(`Insufficient Stock: \n  ${filterGreaterThanStock.map(function (e) { return `${e.ProductName} > ${e.Stock} current stock \n` }).join('\n')}`);
                } else {
                  var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
    
                  //Update order to Closed
                  this.afstore.doc(`Orders/${data.id}`).update({
                    Status: 'Closed'
                  })
      
                  //User Notification Approved
      
                  var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
                  var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
                  var confirmed = `Your order has been confirmed by the admin. ${items}. Total amount of ₱${totalAmount}`
                  this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
                    Message: confirmed,
                    Datetime: datetime,
                    read: false,
                    remarks: "Your order has been confirmed",
                    DatetimeToSort: new Date()
                  })
      
                  //Decreasing Stocks
                  data.OrderDetails.forEach(fe => {
                    //console.log("order details", fe)
                    this.afstore.doc(`Products/${fe.id}`).update({
                      Stock: firebase.default.firestore.FieldValue.increment(-fe.Quantity)
                    })
                  })
      
                  //Inventory Saving
      
                  data.OrderDetails.forEach(fe => {
                    this.afstore.collection('Inventory').add({
                      Quantity: parseInt(fe.Quantity) * -1,
                      Datetime: datetime,
                      read: false,
                      Destination: data.BillingFirstname + " " + data.BillingLastname,
                      ProductName: fe.ProductName,
                      UnitPrice: fe.UnitPrice,
                      ImageUrl: fe.ImageUrl,
                      DatetimeToSort: new Date()
                    })
                  })
      
                  //History Saving
                  this.afstore.collection('History').add({
                    BillingAddress1: data.BillingAddress1,
                    BillingAddress2: data.BillingAddress2,
                    BillingFirstname: data.BillingFirstname,
                    BillingIndexId: data.BillingIndexId,
                    BillingLastname: data.BillingLastname,
                    BillingPhonenumber: data.BillingPhonenumber,
                    Billingemail: data.Billingemail,
                    Datetime: data.Datetime,
                    Status: "Closed",
                    TotalAmount: data.TotalAmount,
                    id: data.id,
                    OrderDetails: data.OrderDetails,
                    read: false,
                    DatetimeToSort: new Date()
                  })
                  this.alertCtrl.create({
                    header: 'Success',
                    message: 'This order approved successfully',
                    buttons: [
                      {
                        text: 'Ok',
                        role: 'cancel'
                      }
                    ]
      
                  }).then(els2 => {
                    els2.present()
                  })
    
                }
               
              }
            },
            {
              text: 'No',
              role: 'cancel'
            }
          ]
    
        }).then(firstalert => {
          firstalert.present()
    
    
        })
  }
  cancelOrder(data) {
    this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.alertCtrl.create({
              header: 'Remarks',
              message: 'Please add a remarks why you want to cancel this order',
              inputs: [
                {
                  name: 'remarks',
                  placeholder: 'Add a remarks'
                }
              ],
              buttons: [
                {
                  text: 'Submit remarks',
                  handler: dataremarks => {


                    var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")

                    //Update order to Cancelled
                    this.afstore.doc(`Orders/${data.id}`).update({
                      Status: 'Cancelled'
                    })


                    //User Notification Approved

                    var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
                    var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
                    var confirmed = `Your order has been declined by the admin. ${items}. Total amount of ₱${totalAmount}`
                    this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
                      Message: confirmed,
                      Datetime: datetime,
                      read: false,
                      remarks: dataremarks.remarks,
                      DatetimeToSort: new Date()
                    })

                    //History Saving
                    this.afstore.collection('History').add({
                      BillingAddress1: data.BillingAddress1,
                      BillingAddress2: data.BillingAddress2,
                      BillingFirstname: data.BillingFirstname,
                      BillingIndexId: data.BillingIndexId,
                      BillingLastname: data.BillingLastname,
                      BillingPhonenumber: data.BillingPhonenumber,
                      Billingemail: data.Billingemail,
                      Datetime: data.Datetime,
                      Status: "Cancelled",
                      TotalAmount: data.TotalAmount,
                      id: data.id,
                      OrderDetails: data.OrderDetails,
                      DatetimeToSort: new Date()
                    })

                    this.alertCtrl.create({
                      header: 'Success',
                      message: 'This order cancelled successfully',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
      
                    }).then(els2 => {
                      els2.present()
                    })
                  }
                }
              ]
            }).then(el => {
              el.present()

             

            })
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(els3 => {
      els3.present()
    })




    // console.log("cancelled", data)
    // var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")

    //  //Update order to Cancelled
    //  this.afstore.doc(`Orders/${data.id}`).update({
    //   Status: 'Cancelled'
    // })


    // //User Notification Approved

    // var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "").split('0.00')[0]
    // var items = data.OrderDetails.map(function (e) {return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}`}).join(', ')
    // var confirmed = `Your order has been declined by the admin. ${items}. Total amount of ₱${totalAmount}`
    // this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
    //   Message: confirmed,
    //   Datetime: datetime,
    //   read: false,
    //   remarks: "Your order has been confirmed"
    // })

    //  //History Saving
    //  this.afstore.collection('History').add({
    //   BillingAddress1: data.BillingAddress1,
    //   BillingAddress2: data.BillingAddress2,
    //   BillingFirstname: data.BillingFirstname,
    //   BillingIndexId: data.BillingIndexId,
    //   BillingLastname: data.BillingLastname,
    //   BillingPhonenumber: data.BillingPhonenumber,
    //   Billingemail: data.Billingemail,
    //   Datetime: data.Datetime,
    //   Status: "Cancelled",
    //   TotalAmount: data.TotalAmount,
    //   id: data.id,    
    //   OrderDetails: data.OrderDetails
    // })
 
 
 
 
 
  }


}
