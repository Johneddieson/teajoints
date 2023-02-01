import { LocationStrategy } from '@angular/common';
import { ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit, OnChanges, SimpleChanges, ɵɵsetComponentScope } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { MessengerService } from '../messenger.service';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/internal/Observable';
import { CreateposPage } from '../createpos/createpos.page';
@Component({
  selector: 'app-admincheckout',
  templateUrl: './admincheckout.page.html',
  styleUrls: ['./admincheckout.page.scss'],
})
export class AdmincheckoutPage implements OnInit {

  getCartDetails: any = []
  getCurrentProductDetails: any = []
  total: number = 0;
  cartItem:number = 0
  getOrders: any = []
  meReference: AngularFirestoreDocument
  stockRefence: AngularFirestoreCollection

  sub
  myInformation: any = {}
  constructor(private menuCtrl: MenuController,
    private loadingController: LoadingController, private alertCtrl: AlertController, private locationStrategy: LocationStrategy, 
    private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore, 
    private msg: MessengerService,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private cdRef: ChangeDetectorRef,
    ) {
      this.msg.cartSubject.subscribe((d) => {
        //this.CartDetails()
        this.loadCart()
       }) 
    //   this.afauth.authState.subscribe(data => {
      
    //   this.msg.cartSubject.next(this.CartDetails())
    //   this.msg.cartSubject.next(this.loadCart())
       
     
     
    // if (data && data.uid) {
    
    //     this.stockRefence =   this.afstore.collection('Products')
    //     this.stockRefence.snapshotChanges()
    //         .pipe(map(actions => actions.map(a => {
    //           return {
    //             id: a.payload.doc.id,
    //             ...a.payload.doc.data() as any
    //           }
    //         })))
    //         .subscribe(Data => {
    //           this.msg.cartSubject.subscribe(d => {
    //             this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
    //             const mergeById = (array1, array2) =>
    //             array1.map(itm => ({
    //                 ...Object.assign({}, itm, {
    //                  Stock: array2.find((item) => (item.id === itm.id) && item).Stock,
    //                  Category: itm.Category,
    //                  ImageUrl: itm.ImageUrl,
    //                  ProductName: itm.ProductName,
    //                  Quantity: itm.Quantity,
    //                  UnitPrice: itm.UnitPrice,
    //                  id: itm.id
    //                })
    //             }));
           
    //             var results = mergeById(this.getCartDetails, Data)
    //             sessionStorage.removeItem('cart')
    //             this.getCartDetails = sessionStorage.setItem('cart', JSON.stringify(results))
    //             this.loadCart()
    //             this.CartDetails()  
    //            console.log("tanga tanga")  
    //           })  
    //       })


    //     this.meReference = afstore.doc(`users/${data.uid}`);
    //     this.sub = this.meReference.valueChanges().subscribe(data => {
    //       this.myInformation = data
    //     })
    //   }
    // })
   }

  ngOnInit(): void {
   this.msg.cartSubject.next(this.loadCart()) 
    // setInterval(() => {
    //   this.loadCart()
    // }, 100)
    
    //this.msg.cartSubject.next(this.CartDetails())
    // this.msg.cartSubject.subscribe((d) => {
    //   this.CartDetails()
    //   this.loadCart()
    //  })

    // this.router.events.subscribe(() => {
    //   this.zone.run(() => {
    //     setTimeout(() => {
    //       this.applicationRef.tick()
    //       this.CartDetails()
    //       this.loadCart()
        
    //     }, 0)
    //   })
    // })

   //this.msg.cartSubject.subscribe(data => {
  //    this.CartDetails()
   //   this.loadCart()
   //})
    //this.msg.cartSubject.next(this.getCartDetails)

    //this.CartDetails()
    //this.loadCart()

    // console.log("tanga tanga ngoninit")
    
    // this.msg.cartSubject.subscribe((d) => {
    //   this.CartDetails()
    //   this.loadCart()
    //  })
  }
  
  CartDetails() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
    }
  }

  inc(id, quantity) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {


        this.getCartDetails[i].Quantity = quantity + 1
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))

    this.loadCart()
  }
  
  dec(id, quantity) {

    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {

        if (quantity != 1)
          this.getCartDetails[i].Quantity = quantity - 1
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))
    this.loadCart()
  }

  loadCart() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
      this.total = this.getCartDetails.reduce((acc, val) => {
        return acc + (val.UnitPrice * val.Quantity)
      }, 0)
    }
  }

  removeall() {
     
    sessionStorage.removeItem('cart')
    
      
    this.getCartDetails = []
    this.total = 0
      this.cartItem = 0
    this.msg.cartSubject.next(this.cartItem)
    this.loadCart()
    
    
  }

  singleDelete(data) {
    //clearInterval(100)
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart')) 
    
      for (let i=0; i<this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].id === data.id && this.getCartDetails[i].ProductName === data.ProductName) {
          this.getCartDetails.splice(i, 1);
          sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))
         
          this.loadCart()
         // this.cartItemFunc()
        }
      }
    }
}
cartItemFunc() {
  var cartValue = JSON.parse(sessionStorage.getItem('cart')) 
    this.cartItem = cartValue.length
  this.msg.cartSubject.next(this.cartItem)

}
gotohome() {
  this.router.navigate(['tabs'])
}
// OrderNow() {
//  this.CartDetails()
 
//  var stockvalidation = this.getCartDetails.filter(f => f.Quantity > f.Stock)
 
//  if (stockvalidation.length > 0) {
//             //ResultModal.show("error", "Saving Delivery Failed", `This title(s) does not fit the remaining stock in the order: \n  ${outofstock.map(function (e) { return e.Itemcode }).join('\n')}`);
//             //  alert(`error ${outofstock[index].Itemcode}`)
//          //   alert(`This title(s) does not fit the remaining stock in the order: \n  ${outofstock.map(function (e) { return e.Itemcode }).join('\n')}`);
//          //   hideLoader('.salesOrderDetails');
//         //    enableSaveButton()
//         alert(`Insufficient Stock: \n  ${stockvalidation.map(function (e) { return `${e.ProductName} > ${e.Stock} current stock \n` }).join('\n')}`); 
//       }
//        else
//       {
//         this.CartDetails()
//         var stockvalidations = this.getCartDetails.filter(f => f.Quantity > f.Stock)
//         if (stockvalidations.length > 0) {
//           alert(`Insufficient Stock: \n  ${stockvalidations.map(function (e) { return e.ProductName }).join('\n')}`); 
  
//         } else {
          
        
//   let length = this.getCartDetails.length > 1 ? "orders" : "order"
//   let orderid = ""



//   this.alertCtrl.create({
//     message: 'Are you sure you want to approve this order?',
//     buttons: [
//       {
//         text: 'Ok',
//         handler: () => {
          
//           this.alertCtrl.create({
//             header: 'Customer Name',
//             inputs: [
//               {
//                 name: 'Name',
//                 placeholder: 'Customer Name',
//                 type: 'text'
//               }
//             ],
//             buttons: [
//               {
//                 text: 'Ok',
//                 handler: (data) => {
//                   //console.log("hahaha", data.Name)
//               if (!data.Name || data.Name == undefined) {
//                 alert("Name of customer is required")
//               }  else if (data.Name.length < 4) {
//                 alert("Name of customer should be four characters minimum")
//               } else {

              
//                   this.alertCtrl.create({
//             message:  `${data.Name} ${length} has been approved!`,
//             buttons: [
//               {
//                 text: 'Ok',
//                 role: 'cancel'
//               }
//             ]
//           }).then(els => {
           
//                 els.present()
//                 //Orders Saving Walk In
//             var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
//             this.afstore.collection('Orders').add({
//               OrderDetails: this.getCartDetails,
//               BillingFirstname: data.Name,
//               BillingLastname: "Walk-In",
//               BillingAddress1: "Walk-In",
//               BillingAddress2: "Walk-In",
//               BillingPhonenumber: "Walk-In",
//               Billingemail: "Walk-In",
//               BillingIndexId: "",
//               Status: 'Approved',
//               Datetime: datetime,
//               TotalAmount: parseFloat(this.total.toString()).toFixed(2),
//               DatetimeToSort: new Date()
//             }).then(el => {
//               orderid = el.id
//             }).catch(err => {
//             })
            
            

//             //Decreasing Stocks
//             this.getCartDetails.forEach(fe => {
//               this.afstore.doc(`Products/${fe.id}`).update({
//                 Stock: firebase.default.firestore.FieldValue.increment(-fe.Quantity)
//               })
//             })

//            //Inventory Saving

//            this.getCartDetails.forEach(fe => {
//             this.afstore.collection('Inventory').add({
//               Quantity: parseInt(fe.Quantity) * -1,
//               Datetime: datetime,
//               read: false,
//               Destination: data.Name,
//               ProductName: fe.ProductName,
//               UnitPrice: fe.UnitPrice,
//               ImageUrl: fe.ImageUrl,
//               DatetimeToSort: new Date()
//             })
//           })

//           //History Saving
//           this.afstore.collection('History').add({
//             BillingAddress1: "Walk-In",
//             BillingAddress2: "Walk-In",
//             BillingFirstname: data.Name,
//             BillingIndexId: "",
//             BillingLastname: "Walk-In",
//             BillingPhonenumber: "Walk-In",
//             Billingemail: "Walk-In",
//             Datetime: datetime,
//             Status: "Closed",
//             TotalAmount: parseFloat(this.total.toString()).toFixed(2),
//             id: orderid,
//             OrderDetails: this.getCartDetails,
//             read: false,
//             DatetimeToSort: new Date()
//           })
//           this.removeall()
//           })
//                 }
//               }
//               },
//               {
//                 text: 'Cancel',
//                 handler: (data) => {

//                 }
//               }
//             ]
//           }).then(El => {
//             El.present()
//           })

//         }
//       },
//       {
//         text: 'Cancel',
//         role: 'cancel'
//       }
//     ]
//   }).then(el => {
//     el.present()
//   })
// }
// }
// }


async OrderNow(paymentMethod: any) 
{
  if (paymentMethod.value == undefined || paymentMethod.value == '' 
  || paymentMethod.value == null)
{
  var paymentMethodRequired = await this.alertCtrl.create({
    message: 'Payment method is required',
    buttons: [
      {
        text: 'Ok',
        role: 'cancel'
      }
    ]
  })

  await paymentMethodRequired.present()
}
else 
{
 var alertConfirmation = await this.alertCtrl.create({
  header: 'Confirmation',
  message: 'Are you sure you want to save this order?',
  buttons: [
    {
      text: 'Yes',
      handler: async () => 
      {
        // this.stockRefence =   this.afstore.collection('Products')
        // this.stockRefence.get()
        // .pipe(map(actions => {
        // return actions.docs.map((doc) => {
        //     return {
        //       id: doc.id,
        //       ...doc.data() as any
        //     }
        //   })
        // })
        // ).subscribe(async data => {
        //   var currentProducts = await data
        //   const mergedCurrentProductsAndOrderedProducts = (orderedProducts, currentProducts) =>  
        //   orderedProducts.map(itm => ({ 
        //     ...Object.assign({}, itm, {
        //       CurrentProductStock: currentProducts.find((item) => (item.id === itm.id) && item).Stock,
        //       //TotalGramsOrder: itm.GramsPerOrder * itm.Quantity     
        //       TotalGramsOrder: itm.Category == 'Milktea'
        //       ?
        //       orderedProducts.reduce((accumulator, object) => {
        //           let sumGrams =  object.GramsPerOrder * object.Quantity
        //           return accumulator + object.GramsPerOrder * object.Quantity
        //         return object
        //         }, 0) 
        //       : itm.GramsPerOrder * itm.Quantity,
        //     })
        //   }))
        //   var results = mergedCurrentProductsAndOrderedProducts(this.getCartDetails, currentProducts)
        // })
      
      
        var customerNameModal = await this.alertCtrl.create({
                      header: 'Customer Name',
                      inputs: [
                        {
                          name: 'Name',
                          placeholder: 'Customer Name',
                          type: 'text'
                        }
                      ],
                     buttons: [
                      {
                        text: 'Ok',
                        handler: async (data) => 
                        {
                          if (!data.Name || data.Name == undefined ||  data.Name == null)
                          {
                            alert("Name of customer is required")
                          }
                          else 
                          {

                              //success order alert
                              var successAlert = await this.alertCtrl.create({
                                message: 'Saved order successfully!',
                                buttons: [
                                  {
                                    text: 'Ok',
                                    handler: async() => 
                                    {
                                            

                                             //Orders Saving Walk In
                                        var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
                                        this.afstore.collection('Orders').add({
                                          OrderDetails: this.getCartDetails,
                                          BillingFirstname: data.Name,
                                          BillingLastname: "Walk-In",
                                          BillingAddress1: "Walk-In",
                                          BillingAddress2: "Walk-In",
                                          BillingPhonenumber: "Walk-In",
                                          Billingemail: "Walk-In",
                                          BillingIndexId: "",
                                          Status: 'Delivered',
                                          Datetime: datetime,
                                          TotalAmount: parseFloat(this.total.toString()).toFixed(2),
                                          DatetimeToSort: new Date(),
                                          PaymentMethod: paymentMethod.value
                                        }).then(async el => {
                                          
                                                    var decrease = await this.getCartDetails.map((i, index) => {
                                                      return Object.assign({}, i, {
                                                        TotalGramsOrder: i.GramsPerOrder * i.Quantity 
                                                      })
                                                    })
                                                     await decrease.forEach(fe => {
                                                        //Decrease Stock of Product
                                                        this.afstore
                                                          .doc(
                                                            `Products/${fe.id}`
                                                          )
                                                          .update({
                                                            Stock:
                                                              firebase.default.firestore.FieldValue.increment(
                                                                -fe.TotalGramsOrder
                                                              ),
                                                          });

                                                        //Inventory Movement
                                                                    this.afstore.collection('Inventory').add({
                                                                      Datetime: datetime,
                                                                      Category: fe.Category,
                                                                      ProductName: fe.ProductName,
                                                                      Quantity: parseInt(fe.TotalGramsOrder) * -1,
                                                                      UnitPrice: fe.UnitPrice,
                                                                      ImageUrl: fe.ImageUrl,
                                                                      GramsPerOrder: fe.GramsPerOrder,
                                                                      Description: fe.Description,
                                                                      SmallPrice: fe.SmallPrice,
                                                                      MediumPrice:  fe.MediumPrice,
                                                                      DatetimeToSort: new Date(),
                                                                      ProductId: fe.id,
                                                                      GramsPerOderSmall: fe.GramsPerOderSmall,
                                                                      GramsPerOderMedium: fe.GramsPerOderMedium,
                                                                    })
                                                      })

                                                    
                                          //History Saving
                                          this.afstore
                                          .collection('History')
                                          .add({
                                            BillingAddress1: 'Walk-In',
                                            BillingAddress2: 'Walk-In',
                                            BillingFirstname: data.Name,
                                            BillingIndexId: '',
                                            BillingLastname: 'Walk-In',
                                            BillingPhonenumber: 'Walk-In',
                                            Billingemail: 'Walk-In',
                                            Datetime: datetime,
                                            Status: 'Delivered',
                                            TotalAmount: parseFloat(
                                              this.total.toString()
                                            ).toFixed(2),
                                            id: el.id,
                                            OrderDetails: this.getCartDetails,
                                            read: false,
                                            DatetimeToSort: new Date(),
                                            PaymentMethod: paymentMethod.value
                                          }).then(async history => 
                                            { 
                                                var loading = await this.loadingController.create
                                                ({
                                                  message: 'Redirecting to invoice...',
                                                  spinner: 'bubbles'
                                                })
                                                await loading.present();
                                                
                                                setTimeout(async () => {
                                                  await loading.dismiss()
                                                  this.router.navigateByUrl(`/invoicepage/${history.id}/history/POS`)  
                                                }, 3000);
                                                //reset the cart
                                                this.removeall();
                                                this.loadCart();
                                                await this.menuCtrl.close('cart')
                                              })
                                        }).catch(async err => {
                                          var errorAlert = await this.alertCtrl.create({
                                            message: JSON.stringify(err),
                                            buttons: [
                                              {
                                                text: 'Ok',
                                                role: 'cancel'
                                              }
                                            ]
                                          })
                                          await errorAlert.present()
                                        })
                                    }
                                  }
                                ]
                              })


                              //call the success alert modal
                              await successAlert.present()
                          }
                        }
                      },
                      {
                        text: 'Cancel',
                        role: 'cancel'
                      }
                     ]   

        });
        await customerNameModal.present()
      }
    },
    {
      text: 'No',
      role: 'cancel'
    }
  ]    
  })
  await alertConfirmation.present()
}
}

}
