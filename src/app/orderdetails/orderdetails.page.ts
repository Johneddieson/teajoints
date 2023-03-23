import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as _ from 'lodash';
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
id;
orderDetails: AngularFirestoreDocument
matRef: AngularFirestoreDocument
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
invoiceDate;
paymentMethod;
approveIcon;
outofStock = false
getProductId = []
currentStockofMaterial: string = ''
public dataMaterials = []
comments: string = ''
@ViewChild(IonModal) modal: IonModal;
  constructor(private actRoute: ActivatedRoute,
    private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController) {
this.afauth.authState.subscribe(user => {
  if (user.uid && user) {
   // console.log("wew", user)
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
      this.paymentMethod = data.PaymentMethod;
      this.comments = data.Comments
    })
  } 
})
  this.approveIcon = 'https://ucarecdn.com/9b6261de-3215-4fd3-b88a-4ef1013e94a9/6BF09351-8372-47C7-8E52-4E7675332C86.jpeg'
   
  // this.afstore.collection('Materials').snapshotChanges()
  // .pipe(map(actions => actions.map(a => {
  //   return {
  //     id: a.payload.doc.id,
  //     ...a.payload.doc.data() as any
  //   }
  // })))
  // .subscribe(data => {
  //   data.forEach(fe => {
  //     this.afstore.doc(`Materials/${fe.id}`).update({
  //       Stock: 20000
  //     })
  //   })
  // })

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
   
   pdf.save('output.pdf'); 
   });
  }
  ngOnInit() {

  }

  // approveOrder() {
  // var  data = this.data
  //   this.currentProductStockReference = this.afstore.collection('Products')
    
  //             this.sub2 = this.currentProductStockReference.snapshotChanges().pipe(
  //               map(actions => actions.map(a => {
  //                 return {
  //                   id: a.payload.doc.id,
  //                   ...a.payload.doc.data() as any
  //                 }
  //               }))
  //             ).subscribe(dataCurrentStock => {
  //                const mergeById = (array1, array2) =>
  //                array2.map(itm => ({
  //                   ...Object.assign({}, itm, {
  //                    //Stock: array2.find((item) => (item.id === itm.id) && item).Stock,
  //                    Stock: array1.find((item) => (item.id === itm.id) && item).Stock,
  //                    Category: itm.Category,
  //                    ImageUrl: itm.ImageUrl,
  //                    ProductName: itm.ProductName,
  //                    Quantity: itm.Quantity,
  //                    UnitPrice: itm.UnitPrice,
  //                    id: itm.id                
  //                  })
  //               }));
    
  //              var results = mergeById(dataCurrentStock, data.OrderDetails)
  //               this.currentStock = results
                
  //           })
    
  //           this.alertCtrl.create({
  //             header: 'Question',
  //             message: 'Are you sure you want to approve this order?',
  //             buttons: [
  //               {
  //                 text: 'Yes',
  //                 handler: () => {
  //                   var filterGreaterThanStock = this.currentStock.filter(f => f.Quantity > f.Stock)   
  //                   if (filterGreaterThanStock.length > 0) {
        
  //                     alert(`Insufficient Stock: \n  ${filterGreaterThanStock.map(function (e) { return `${e.ProductName} > ${e.Stock} current stock \n` }).join('\n')}`);
  //                   } else {
  //                     var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
        
  //                     //Update order to Closed
  //                     this.afstore.doc(`Orders/${data.id}`).update({
  //                       Status: 'Closed'
  //                     })
          
  //                     //User Notification Approved
          
  //                     var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
  //                     var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
  //                     var confirmed = `Your order has been confirmed by the admin. ${items}. Total amount of ₱${totalAmount}`
  //                     this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
  //                       Message: confirmed,
  //                       Datetime: datetime,
  //                       read: false,
  //                       remarks: "Your order has been confirmed",
  //                       DatetimeToSort: new Date()
  //                     })
          
  //                     //Decreasing Stocks
  //                     data.OrderDetails.forEach(fe => {
  //                       //console.log("order details", fe)
  //                       this.afstore.doc(`Products/${fe.id}`).update({
  //                         Stock: firebase.default.firestore.FieldValue.increment(-fe.Quantity)
  //                       })
  //                     })
          
  //                     //Inventory Saving
          
  //                     data.OrderDetails.forEach(fe => {
  //                       this.afstore.collection('Inventory').add({
  //                         Quantity: parseInt(fe.Quantity) * -1,
  //                         Datetime: datetime,
  //                         read: false,
  //                         Destination: data.BillingFirstname + " " + data.BillingLastname,
  //                         ProductName: fe.ProductName,
  //                         UnitPrice: fe.UnitPrice,
  //                         ImageUrl: fe.ImageUrl,
  //                         DatetimeToSort: new Date()
  //                       })
  //                     })
          
  //                     //History Saving
  //                     this.afstore.collection('History').add({
  //                       BillingAddress1: data.BillingAddress1,
  //                       BillingAddress2: data.BillingAddress2,
  //                       BillingFirstname: data.BillingFirstname,
  //                       BillingIndexId: data.BillingIndexId,
  //                       BillingLastname: data.BillingLastname,
  //                       BillingPhonenumber: data.BillingPhonenumber,
  //                       Billingemail: data.Billingemail,
  //                       Datetime: data.Datetime,
  //                       Status: "Closed",
  //                       TotalAmount: data.TotalAmount,
  //                       id: data.id,
  //                       OrderDetails: data.OrderDetails,
  //                       read: false,
  //                       DatetimeToSort: new Date()
  //                     })
                      
  //                     this.alertCtrl.create({
  //                       header: 'Success',
  //                       message: 'This order approved successfully',
  //                       buttons: [
  //                         {
  //                           text: 'Ok',
  //                           //role: 'cancel',
  //                            handler: data => {
  //                             this.router.navigateByUrl(`/invoicepage/${this.id}/orders`)
  //                           } 
  //                         }
  //                       ]
          
  //                     }).then(els2 => {
  //                       els2.present()
  //                     })
        
  //                   }
                   
  //                 }
  //               },
  //               {
  //                 text: 'No',
  //                 role: 'cancel'
  //               }
  //             ]
        
  //           }).then(firstalert => {
  //             firstalert.present()
        
        
  //           })
  //     }


updateStocks(itemId, Quantity, gramsperorder)
{
   //this.decreaseStocks()
  var total = parseFloat(Quantity) * parseFloat(gramsperorder) 
  this.afstore.doc(`Materials/${itemId}`).update({
    Stock: firebase.default.firestore.FieldValue.increment(-total),
  }).then(el => {
  }).catch(err => {
    //console.log("error edit stock", err)
  })
}
updateStocks2(itemId, Quantity, gramsperorder)
{
  var total = parseFloat(Quantity) * parseFloat(gramsperorder) 
  this.afstore.doc(`Materials/${itemId}`).update({
    Stock: firebase.default.firestore.FieldValue.increment(total),
  }).then(el => {
    //console.log("success edit stock", el)
  }).catch(err => {
    //console.log("error edit stock", err)
  })
}
async saveQuantityChanged()
{
  //console.log("finalized", this.dataMaterials)
  //console.log("new order details", orders)
  //console.log("new order details", this.orders.map(function(e) {return e.Materials}))
  this.updateMaterial()
}
async changeStatus()
{
 // console.log("finalized", this.dataMaterials)
  
 var data = this.data
  
  if (data.Status == 'Pending')
  {
   var approveAlert = await this.alertCtrl.create({
    header: 'Confirmation',
    message: 'Are you sure you want to approve this order?',
    buttons: [
      {
        text: 'Yes',
        handler: async () => 
        {
          var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
        
          //Update order to Approved
          this.afstore.doc(`Orders/${data.id}`).update({
            Status: 'Approved'
          }).then(async el => {
          //User Notification Approved
          var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
          var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
          var confirmed = `Your order has been approved by the admin. ${items}. Total amount of ₱${totalAmount}`
          this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
            Message: confirmed,
            Datetime: datetime,
            read: false,
            remarks: "Your order has been approved",
            DatetimeToSort: new Date()
          })
        //Decrease Stock
          this.decreaseStock()
        
         
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
            Status: "Delivered",
            TotalAmount: data.TotalAmount,
            id: data.id,
            OrderDetails: data.OrderDetails,
            read: false,
            DatetimeToSort: new Date(),
            PaymentMethod: data.PaymentMethod,
            Comments: data.Comments
          })
          }).catch(async err => {
              var ErrorAlert = this.alertCtrl.create({
                message: JSON.stringify(err),
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel'
                  }
                ]
              })
              await ErrorAlert;
          })
          var ApprovedStatusLoadingController = await this.loadingCtrl.create
          ({
            spinner: 'bubbles',
            message: 'Approving status please wait...'
          })
          await ApprovedStatusLoadingController.present();

          setTimeout(async () => {
            await ApprovedStatusLoadingController.dismiss();
            var alertControllerApprovedStatusSuccess = await this.alertCtrl.create
            ({
              message: 'This order approved successfully!',
              buttons: 
              [
                {
                  text: 'Close',
                  role: 'cancel'
                }
              ]
            })
            await alertControllerApprovedStatusSuccess.present();
          }, 3000);
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }
    ]
  })
  await approveAlert.present();
  }
  else if (data.Status == 'Approved')
  {
    var preparingAlert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure you want to change the status as preparing?',
      buttons: [
        {
          text: 'Ok',
          handler: async ()  =>
          {
            var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
        
            //Update order to Approved
            this.afstore.doc(`Orders/${data.id}`).update({
              Status: 'Preparing'
            }).then(el => {
            
            //User Notification Approved
  
            var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
            var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
            var confirmed = `Your order is preparing. ${items}. Total amount of ₱${totalAmount}`
            this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
              Message: confirmed,
              Datetime: datetime,
              read: false,
              remarks: "Your order is preparing",
              DatetimeToSort: new Date()
            })              
            })
            .catch(async err => {
               var errAlert = await this.alertCtrl.create({
                message: JSON.stringify(err),
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel'
                  }
                ]
               })
               await errAlert.present() 
            })
            var PreparingStatusLoadingController = await this.loadingCtrl.create
            ({
              spinner: 'bubbles',
              message: 'Preparing status please wait...'
            })
            await PreparingStatusLoadingController.present();
  
            setTimeout(async () => {
              await PreparingStatusLoadingController.dismiss();
              var alertControllerPreparingStatusSuccess = await this.alertCtrl.create
              ({
                message: 'This order is now preparing.',
                buttons: 
                [
                  {
                    text: 'Close',
                    role: 'cancel'
                  }
                ]
              })
              await alertControllerPreparingStatusSuccess.present();
            }, 3000);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    })
    await preparingAlert.present()
  }
  else if (data.Status == 'Preparing')
  {
    var toDeliverAlert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure you want to change the status as to deliver?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => 
          {
            var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
        
            //Update order to Approved
            this.afstore.doc(`Orders/${data.id}`).update({
              Status: 'To Deliver'
            }).then(el => {
            
            //User Notification Approved
  
            var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
            var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
            var confirmed = `Your order is to deliver. ${items}. Total amount of ₱${totalAmount}`
            this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
              Message: confirmed,
              Datetime: datetime,
              read: false,
              remarks: "Your order is to deliver",
              DatetimeToSort: new Date()
            })              
            })
            .catch(async err => {
               var errAlert = await this.alertCtrl.create({
                message: JSON.stringify(err),
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel'
                  }
                ]
               })
               await errAlert.present() 
            })
            var PreparingStatusLoadingController = await this.loadingCtrl.create
            ({
              spinner: 'bubbles',
              message: 'To Deliver status please wait...'
            })
            await PreparingStatusLoadingController.present();
  
            setTimeout(async () => {
              await PreparingStatusLoadingController.dismiss();
              var alertControllerPreparingStatusSuccess = await this.alertCtrl.create
              ({
                message: 'This order is to deliver',
                buttons: 
                [
                  {
                    text: 'Close',
                    role: 'cancel'
                  }
                ]
              })
              await alertControllerPreparingStatusSuccess.present();
            }, 3000);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    })
    await toDeliverAlert.present() 
  }

  else if (data.Status == 'To Deliver')
  {
    var deliveredAlert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure you want to change the status as delivered?',
      buttons: 
      [
        {
          text: 'Ok',
          handler: async () => 
          {
            var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
        
            //Update order to Approved
            this.afstore.doc(`Orders/${data.id}`).update({
              Status: 'Delivered'
            }).then(el => {
            
            //User Notification Approved
  
            var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
            var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
            var confirmed = `Your order has been delivered. ${items}. Total amount of ₱${totalAmount}`
            this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
              Message: confirmed,
              Datetime: datetime,
              read: false,
              remarks: "Your order has been delivered",
              DatetimeToSort: new Date()
            })              
            })
            .catch(async err => {
               var errAlert = await this.alertCtrl.create({
                message: JSON.stringify(err),
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel'
                  }
                ]
               })
               await errAlert.present() 
            })
            var ToDeliverStatusLoadingController = await this.loadingCtrl.create
            ({
              spinner: 'bubbles',
              message: 'Delivered status please wait...'
            })
            await ToDeliverStatusLoadingController.present();
  
            setTimeout(async () => {
              await ToDeliverStatusLoadingController.dismiss();
              var alertControllerToDeliverStatusSuccess = await this.alertCtrl.create
              ({
                message: 'This order has been delivered',
                buttons: 
                [
                  {
                    text: 'Close',
                    role: 'cancel'
                  }
                ]
              })
              await alertControllerToDeliverStatusSuccess.present();
            }, 3000);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    await deliveredAlert.present(); 
  }
  else 
  {
    var deliveredAlert = await this.alertCtrl.create({
        message: 'This order has been delivered',
        buttons: 
        [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
    })
    await deliveredAlert.present()
    var DeliveredStatusLoadingController = await this.loadingCtrl.create
    ({
      spinner: 'bubbles',
      message: 'Delivered status please wait...'
    })
    await DeliveredStatusLoadingController.present();

    setTimeout(async () => {
      await DeliveredStatusLoadingController.dismiss();
      var alertControllerDeliveredStatusSuccess = await this.alertCtrl.create
      ({
        message: 'This order has been delivered.',
        buttons: 
        [
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      })
      await alertControllerDeliveredStatusSuccess.present();
    }, 3000);
  }
}

getMaterials()
{
   this.getProductId = this.orders

    this.getProductId.map((i, index) => 
   {
    i.Materials.map(fe => 
      {
    fe.Quantity = i.Quantity   
        
  })
   })
}

decreaseStock()
{
  //this.getMaterials()
  var getmaterial = this.orders.map(function (e) {return e.Materials})
       
  var ew = _.flatten(getmaterial)

 
   ew.forEach(fe => 
    {
        this.updateStocks(fe.itemId, fe.Quantity, fe.gramsperorder)
    })
}

      cancelOrder() {
        var  data = this.data
        this.alertCtrl.create({
          header: 'Confirmation',
          message: 'Are you sure you want to reject this order?',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                this.alertCtrl.create({
                  header: 'Remarks',
                  message: 'Please add a remarks why you want to reject this order',
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
    
    
                        var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
    
                        //Update order to Cancelled
                        this.afstore.doc(`Orders/${data.id}`).update({
                          Status: 'Rejected'
                        })
    
    
                        //User Notification Approved
    
                        var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
                        var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
                        var confirmed = `Your order has been rejected by the admin. ${items}. Total amount of ₱${totalAmount}`
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
                          Status: "Rejected",
                          TotalAmount: data.TotalAmount,
                          id: data.id,
                          OrderDetails: data.OrderDetails,
                          DatetimeToSort: new Date()
                        })
    
                        this.alertCtrl.create({
                          header: 'Success',
                          message: 'This order rejected successfully',
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

     async customerInfo() {
        var alertCtrl = await this.alertCtrl.create({
          header: `${this.firstname} ${this.lastname}`,
          subHeader: `${this.phonenumber} ${this.email}`,
          message: `<br> Payment Method: ${this.paymentMethod} <br> Address1: ${this.address1} <br> Address2: ${this.address2}`,
          buttons: [
            {
              text: 'Close',
              role: 'cancel'
            }
          ]
        })
        await alertCtrl.present()
      }

      exportPdf() {
        var paramName = this.name == 'orders' ? 'orders' : 'history'
        this.router.navigateByUrl(`/invoicepage/${this.id}/${paramName}/Online`)
 
      }

      getMaterialOfProducts(Data)
      {
        this.dataMaterials = []
        // Data = Data.Materials.map((i, index) => 
        // {
        //   return Object.assign({}, i, 
        //     {
        //       Quantity: Data.Quantity
        //     })
        // })
        //console.log("the data", Data)
        this.dataMaterials = Data.Materials
        this.modal.present(); 
      }
      close() {
        this.modal.dismiss(); 
    }
    async showComments()
    {
      var showCommentAlert = await this.alertCtrl.create
      ({
        message: this.comments != '' ? `${this.comments}` : `No comments...`,
        backdropDismiss: false,
        buttons: 
        [
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      })
      await showCommentAlert.present();
    }
    editMaterialQuantity(event, mat)
    {
      var value = event.target.value
      //console.log("quantity value", value)
      //console.log("material", mat)
      mat.Quantity = parseInt(value)
      //console.log("this order", this.orders)

    }
     updateMaterial()
    {
      this.afstore.doc(`Orders/${this.id}`).update
      ({
        OrderDetails: this.orders
      }).then(async (success) => 
      {
        var successAlert = await this.alertCtrl.create
        ({
          message: 'Updated materials successfully!',
          backdropDismiss: false,
          buttons: 
          [
            {
              text: 'Close',
              role: 'cancel'
            }
          ]
        })
        await successAlert.present();
      }).catch((err) => 
      {
        //console.log("error updating quantity")
        alert(JSON.stringify(err))
      })
    }
}
