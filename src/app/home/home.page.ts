import { ApplicationRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import { MessengerService } from '../messenger.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notificationsReference: AngularFirestoreCollection
  sub
numbers = 0;
showLog = false
productReference: AngularFirestoreCollection
productList: any[] = []
getCartDetails: any = []
cartItem:number = 0
@Input()title: string;
dropdown = false;
category = ""
notificationsList : any[] = []
notifCounts = 0
@ViewChild('productbtn', {read: ElementRef}) productbtn: ElementRef;
@ViewChild(IonModal) modal: IonModal;
private unsubscriber : Subject<void> = new Subject<void>();
  constructor(private msg: MessengerService, private alertCtrl: AlertController, private auth: AuthServiceService,  private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private locationStrategy: LocationStrategy,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {
   
      router.events.subscribe(() => {
        zone.run(() => {
          setTimeout(() => {
            this.applicationRef.tick()
            this.loadCart()
          }, 0)
        })
      })
    this.afauth.authState.subscribe(user => {
      //console.log("user information", user)
      if (user && user.uid) {
    var wew = user.emailVerified
        this.getAllProducts()

    this.notificationsReference = this.afstore.collection(`users/${user.uid}/notifications`)

        this.sub = this.notificationsReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
            data = data.map((i, index) => {
              return Object.assign({
                id: i.id,
                Datetime: i.Datetime,
                DatetimeToSort: moment(i.Datetime).toDate(),
                read: i.read,
                remarks: i.remarks,
                Message: i.Message
              })
            })
            data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
            this.notificationsList = data
            var filterOnlyNotRead = data.filter(f => f.read != true)
              this.notifCounts = filterOnlyNotRead.length
          })
      }
    })
   }

  ngOnInit(): void {
    
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick()
          this.loadCart()
        }, 0)
      })
    })
// history.pushState(null, null, location.href);
// this.locationStrategy.onPopState(() => {
//   history.pushState(null, null, location.href);
// })

var wew = sessionStorage.getItem('cart')

  }
  getAllProducts() {
    this.productReference = !this.category ? this.afstore.collection('Products') : this.afstore.collection('Products', ref => ref.where("Category", "==", this.category))
  
  this.sub = this.productReference.snapshotChanges().pipe(map(actions => actions.map(a => {
    return {
      id: a.payload.doc.id,
      ...a.payload.doc.data() as any
    }
   }))).subscribe(data => {
  //  data = data.map((i, index) => {
  //     var image = i.ImageUrl as string
  //     var imageApiUrl = image.substring(0,58)
  //     var imageName = image.replace(image.substring(0,58), "")

  //      return Object.assign({}, i, {
  //        ImageUrl: `${imageApiUrl}-/smart_resize/440x300/${imageName}`
  //      })
  //    })
  data = data.sort(function(a, b) {
    if (a.ProductName < b.ProductName) {
      return -1
    }
    if (a.ProductName > b.ProductName) {
      return 1
    }
    return 0
  })  
  this.productList = data
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
  // CartDetails() {
  //   if (sessionStorage.getItem('cart')) {
  //     this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
  
  //     this.numbers = this.getCartDetails
  //   }
  // }
loadCart() {
  if (sessionStorage.getItem('cart') != null) {
var thearray = []
    thearray.push(JSON.parse(sessionStorage.getItem('cart')))
    
   
    this.numbers = thearray[0].length;
  } else {
    this.numbers = 0
  } 
}
  Increase(data) {
    data.Quantity +=1
  this.loadCart()
  }
  Decrease(data) {
    if (data.Quantity == 1) {
      this.alertCtrl.create({
        message: 'Quantity should not be zero',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      }).then(el => {
        el.present()
        this.loadCart()
      })
    } else {
      data.Quantity -= 1
this.loadCart()
    }
  }
  
  itemsCart: any = []
//   AddtoCart(data) {
//       if (data.Quantity > data.Stock) {
//         this.alertCtrl.create({
//           message: 'The quantity order should not be greater than the stock available',
//           buttons: [
//             {
//               text: 'Ok',
//               role: 'cancel'
//             }
//           ]
//         }).then(el => {
//           el.present()
//           data.Quantity = 1
//         })
//       } else {

      
//     var cartData = sessionStorage.getItem('cart')
//     if (cartData == null) {
//       var theid = data.id
//       let index: number = -1
//       let storageDataGet: any = []
//         storageDataGet.push(data)
//         sessionStorage.setItem('cart', JSON.stringify(storageDataGet)) 
       
//         data.Quantity = 1
//     } else {
//       var id = data.id
//       let index: number = -1

//       this.itemsCart = JSON.parse(sessionStorage.getItem('cart'))
//       for (let i= 0; i<this.itemsCart.length; i++) {
//         if (id == this.itemsCart[i].id) {
//           this.itemsCart[i].Quantity = data.Quantity
//           data.Quantity = 1
//           index = i;
//           break;
//         }
//       }
    
//       if (index == -1) {
//           this.itemsCart.push(data)
          
//           sessionStorage.setItem('cart', JSON.stringify(this.itemsCart))
          
//           data.Quantity = 1
//       } else {
//         sessionStorage.setItem('cart', JSON.stringify(this.itemsCart))
       
//         data.Quantity = 1
//       }
//     this.cartItemFunc()
   
//     }
//     this.loadCart()
//   }
// }
  cartItemFunc() {
    var cartValue = JSON.parse(sessionStorage.getItem('cart')) 
      this.cartItem = cartValue.length
    this.msg.cartSubject.next(this.cartItem)
  
  }
  checkout() {
  this.router.navigateByUrl('/checkout')
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

      parseToFloat(data) 
      {
        var converStock = parseFloat(data).toFixed(2)
          return converStock
      }

      async AddtoCart(data) 
      {
        if (data.Materials.length <= 0)
        {
          alert("This product has no condiments.")
        }
        else 
        {
      var cartData = sessionStorage.getItem('cart');
      let storageDataGet: any = [];
      
      //no item in the cart yet
      if (cartData == null) 
      {  
        if (data.Category == 'Milktea') 
        {
          var alertMilktea = await this.alertCtrl.create({
            header: 'Please choose a size',
            inputs: [
              {
                type: 'radio',
                label: 'Small',
                value: 'Small',
              },
              {
                type: 'radio',
                label: 'Medium',
                value: 'Medium',
              },
            ],
            buttons: [
              {
                text: 'Go',
                handler: async (size) => {
                  if (size == undefined || size == null ||
                    size == '')
                    {
                     var nosizeSelected = await this.alertCtrl.create({
                      message: 'No size selected',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
                     })
                     await nosizeSelected.present()     
                    }
                    else {
                      var ordernotmilkteaAndfries =  this.AddtoCartObject(data, size, '')  
                      storageDataGet.push(ordernotmilkteaAndfries);
                      sessionStorage.setItem('cart', JSON.stringify(storageDataGet));
                      data.Quantity = 1;
                      this.loadCart();
                    }
                },
              },
              {
                text: 'Close',
                role: 'cancel',
              },
            ]
    
          })
          await alertMilktea.present()
        }
        else if (data.Category == 'Snacks' && (data.ProductName == 'Fries' || data.ProductName == 'Chicken Fingers'))
        {
            var alertSnacks = await this.alertCtrl.create({
              header: 'Please choose a flavor',
              inputs: [
                {
                  type: 'radio',
                  label: 'Cheese',
                  value: 'Cheese',
                },
                {
                  type: 'radio',
                  label: 'Sour Cream',
                  value: 'Sour Cream',
                },
                {
                  type: 'radio',
                  label: 'Bbq',
                  value: 'Bbq',
                },
              ],
              buttons: [
                {
                  text: 'Go',
                  handler: async (flavor) => {
                    if (flavor == undefined || flavor == '' ||
                    flavor == null)
                    {
                      var noFlavorSelected = await this.alertCtrl.create({
                        message: 'No flavor selected',
                        buttons: [
                          {
                            text: 'Ok',
                            role: 'cancel'
                          }
                        ]
                      })
                      await noFlavorSelected.present()
                    }
                    else 
                    {
                      var ordernotmilkteaAndfries =  this.AddtoCartObject(data, '', flavor)  
                      storageDataGet.push(ordernotmilkteaAndfries);
                      sessionStorage.setItem('cart', JSON.stringify(storageDataGet));  
                      data.Quantity = 1;
                        this.loadCart();  
                    }     
                  },
                },
                {
                  text: 'Close',
                  role: 'cancel',
                },
              ] 
            })
            await alertSnacks.present()
        }
        else 
        {
          var ordernotmilkteaAndfries =  this.AddtoCartObject(data, '', '')  
          storageDataGet.push(ordernotmilkteaAndfries);
          sessionStorage.setItem('cart', JSON.stringify(storageDataGet));
          data.Quantity = 1; 
            //this.loadCart();  
          //this.loadCart();
          //this.cartItemFunc();  
          }
    }
    //already have an items in the cart
      else 
      {
        if (data.Category == 'Milktea') 
        {
          var alertMilktea = await this.alertCtrl.create({
            header: 'Please choose a size',
            inputs: [
              {
                type: 'radio',
                label: 'Small',
                value: 'Small',
              },
              {
                type: 'radio',
                label: 'Medium',
                value: 'Medium',
              },
            ],
            buttons: [
              {
                text: 'Go',
                handler: async (size) => {
                  if (size == '' || size == undefined ||
                  size == null)
                  {
                     var noSizeSelected = await this.alertCtrl.create({
                      message: 'No size selected',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
                     }) 
                     await noSizeSelected.present()
                  } 
                  else 
                  {
                  var id = data.id;
                  let index: number = -1;
                  this.itemsCart = JSON.parse(sessionStorage.getItem('cart'));
                  
                  for (let i = 0; i < this.itemsCart.length; i++) {
                    if (id == this.itemsCart[i].id && this.itemsCart[i].ProductName == `${data.ProductName} ${size}`) {
                      this.itemsCart[i].Quantity = data.Quantity;
                      data.Quantity = 1;
                      index = i;
                      break;
                    }
                  }
                  if (index == -1) 
                      {
                        //if cart session is not equal to null and the added product is not yet existing  
                        var cartConvertToParse = JSON.parse(cartData);

                        if (cartConvertToParse.length >= 10)
                        {
                            var orderLimitAlert = await this.alertCtrl.create({
                              message: 'Orders should be 10 maximum.',
                              buttons: 
                              [
                                {
                                  text: 'Ok',
                                  role: 'cancel'
                                }
                              ]
                            })
                            await orderLimitAlert.present();
                        }
                        else 
                        {
                          var ordernotmilkteaAndfries =  this.AddtoCartObject(data, size, '')
                          this.itemsCart.push(ordernotmilkteaAndfries);
                          sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                        }
                        data.Quantity = 1;
                      } 
                      else 
                      {
                        //if cart session is not equal to null and the added product is existing
                        sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                        data.Quantity = 1;
                      }
                  data.Quantity = 1; 
                  this.loadCart(); 
                  }               
                },
              },
              {
                text: 'Close',
                role: 'cancel',
              },
            ]
    
          })
          await alertMilktea.present()
        }
        else if (data.Category == 'Snacks' && (data.ProductName == 'Fries' || data.ProductName == 'Chicken Fingers'))
        {
            var alertSnacks = await this.alertCtrl.create({
              header: 'Please choose a flavor',
              inputs: [
                {
                  type: 'radio',
                  label: 'Cheese',
                  value: 'Cheese',
                },
                {
                  type: 'radio',
                  label: 'Sour Cream',
                  value: 'Sour Cream',
                },
                {
                  type: 'radio',
                  label: 'Bbq',
                  value: 'Bbq',
                },
              ],
              buttons: [
                {
                  text: 'Go',
                  handler: async (flavor) => {
                    if (flavor == undefined || flavor == ''
                    || flavor == null)
                    {
                        var noSizeSelected = await this.alertCtrl.create({
                          message: 'No flavor selected',
                          buttons: [
                            {
                              text: 'Ok',
                              role: 'cancel'
                            }
                          ]
                        })
                        await noSizeSelected.present()
                    }
                    else 
                    {
                      var id = data.id;
                      let index: number = -1;
                      this.itemsCart = JSON.parse(sessionStorage.getItem('cart'));
      
                      for (let i = 0; i < this.itemsCart.length; i++) {
                        if (id == this.itemsCart[i].id && this.itemsCart[i].ProductName == `${data.ProductName} ${flavor}`) {
                          this.itemsCart[i].Quantity = data.Quantity;
                          data.Quantity = 1;
                          index = i;
                          break;
                        }
                      }
                      if (index == -1) 
                          {
                            //if cart session is not equal to null and the added product is not yet existing  
                           
                            var cartConvertToParse = JSON.parse(cartData);

                        if (cartConvertToParse.length >= 10) 
                        {
                          var orderLimitAlert = await this.alertCtrl.create({
                            message: 'Orders should be 10 maximum.',
                            buttons: [
                              {
                                text: 'Ok',
                                role: 'cancel',
                              },
                            ],
                          });
                          await orderLimitAlert.present();
                        } 
                        else 
                        {
                          var ordernotmilkteaAndfries =  this.AddtoCartObject(data, '', flavor)
                          this.itemsCart.push(ordernotmilkteaAndfries);
                          sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                        }
                            data.Quantity = 1;
                          } 
                          else 
                          {
                            //if cart session is not equal to null and the added product is existing
                            sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                            data.Quantity = 1;
                          }
                    data.Quantity = 1; 
                    this.loadCart();
                    //this.cartItemFunc(); 
                    }
                  },
                },
                {
                  text: 'Close',
                  role: 'cancel',
                },
              ] 
            })
            await alertSnacks.present()
        }
        else 
        {
          var id = data.id;
          let index: number = -1;
          this.itemsCart = JSON.parse(sessionStorage.getItem('cart'));
          
            
          for (let i = 0; i < this.itemsCart.length; i++) {
            if (id == this.itemsCart[i].id && this.itemsCart[i].ProductName == data.ProductName) {
              this.itemsCart[i].Quantity = data.Quantity;
              data.Quantity = 1;
              index = i;
              break;
            }
          }
          if (index == -1) 
              {
                //if cart session is not equal to null and the added product is not yet existing  
                var cartConvertToParse = JSON.parse(cartData);

                if (cartConvertToParse.length >= 10) 
                {
                  var orderLimitAlert = await this.alertCtrl.create({
                    message: 'Orders should be 10 maximum.',
                    buttons: [
                      {
                        text: 'Ok',
                        role: 'cancel',
                      },
                    ],
                  });
                  await orderLimitAlert.present();
                } 
                else 
                {
                  var ordernotmilkteaAndfries =  this.AddtoCartObject(data, '', '')
                  this.itemsCart.push(ordernotmilkteaAndfries);
                  sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                }
                data.Quantity = 1;
              } 
              else 
              {
                //if cart session is not equal to null and the added product is existing
                sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                data.Quantity = 1;
              }
        }
      }
      this.loadCart();
      //this.cartItemFunc(); 
    }
      }    

      AddtoCartObject(data: any, size: any, flavor: any) 
      {
        var concatenatedArrays;
        if (flavor != null || flavor != '' || flavor != undefined)
        {
          var flavorMaterial = data.Materials.filter(f => f.itemName.toLowerCase().includes(flavor.toLowerCase()))
           var oilMaterial = data.Materials.filter(f => f.itemName.toLowerCase().includes('oil'))
          concatenatedArrays = flavorMaterial.concat(oilMaterial)
        }
        else 
        {
          concatenatedArrays = data.Materials 
        }   
        var ordernotmilkteaAndfries = Object.assign({}, data, {
              Materials: concatenatedArrays,
               Category: data.Category,
               Description: data.Description,
               GramsPerOrder: data.Category != 'Milktea' || data.Category == 'Snacks' ?  data.GramsPerOrder 
               : size == 'Small' ? data.GramsPerOderSmall : data.GramsPerOderMedium,
               ImageUrl: data.ImageUrl,
               ProductName: data.Category != 'Milktea' ? data.ProductName == 'Fries' || 
               data.ProductName == 'Chicken Fingers' 
               ? `${data.ProductName} ${flavor}` : data.ProductName 
               : `${data.ProductName} ${size}`,
               Quantity: data.Quantity,
               Stock: data.Stock,
               UnitPrice: data.Category != 'Milktea' ||  data.Category == 'Snacks' ? data.UnitPrice 
               : size == 'Small' ? data.SmallPrice : data.MediumPrice,
               id: data.id
       })
       //console.log("addtocartobjectmethod", ordernotmilkteaAndfries)
       return ordernotmilkteaAndfries
      }


      async ProductDetails(id: string) 
      {
         await this.router.navigateByUrl(`details/${id}`)
      }


      close() {
        this.modal.dismiss() 
    }

    async ShowProductDescription(data) 
    {
      var alertController = await this.alertCtrl.create({
        header: `${data.ProductName}`,
        subHeader: `${data.Description}`,
        message: `<img src="${data.ImageUrl}" style="height: 30%;">`,
        buttons: [
          {
            text: 'Exit',
            role: 'cancel'
          }
        ]
      })
      await alertController.present()
    }
    }
