import { LocationStrategy } from '@angular/common';
import {
  ApplicationRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-createpos',
  templateUrl: './createpos.page.html',
  styleUrls: ['./createpos.page.scss'],
})
export class CreateposPage implements OnInit {
  numbers = 0;
  showLog = false;
  productReference: AngularFirestoreCollection;
  sub;
  productList: any[] = [];
  getCartDetails: any = [];
  cartItem: number = 0;
  @Input() title: string;
  dropdown = false;
  category = '';
  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  private unsubscriber: Subject<void> = new Subject<void>();
  constructor(
    private msg: MessengerService,
    private alertCtrl: AlertController,
    private auth: AuthServiceService,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private locationStrategy: LocationStrategy,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {
    // router.events.subscribe(() => {
    //   zone.run(() => {
    //     setTimeout(() => {
    //       this.applicationRef.tick()
    //       this.loadCart()
    //     }, 0)
    //   })
    // })
    this.msg.cartSubject.subscribe((d) => {
      this.loadCart();
    });
    this.afauth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.getAllProducts();
      }
    });
  }
  getAllProducts() {
    this.productReference = !this.category
      ? this.afstore.collection('Products')
      : this.afstore.collection('Products', (ref) =>
          ref.where('Category', '==', this.category)
        );
    this.sub = this.productReference
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            return {
              id: a.payload.doc.id,
              ...(a.payload.doc.data() as any),
            };
          })
        )
      )
      .subscribe((data) => {
        data = data.sort(function (a, b) {
          if (a.ProductName < b.ProductName) {
            return -1;
          }
          if (a.ProductName > b.ProductName) {
            return 1;
          }
          return 0;
        });
        this.productList = data;
      });
  }
  async loadProducts() {
    var loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 300);
  }
  ngOnInit(): void {
    // this.router.events.subscribe(() => {
    //   this.zone.run(() => {
    //     setTimeout(() => {
    //       this.applicationRef.tick()
    //       this.loadCart()
    //     }, 0)
    //   })
    // })
    this.msg.cartSubject.subscribe((d) => {
      this.loadCart();
    });
  }
  async SearchCategory() {
    var alert = this.alertCtrl.create({
      header: 'Choose Category',
      inputs: [
        {
          type: 'radio',
          label: '--SHOW ALL--',
          value: '',
        },
        {
          type: 'radio',
          label: 'Frappe',
          value: 'Frappe',
        },
        {
          type: 'radio',
          label: 'Milktea',
          value: 'Milktea',
        },
        {
          type: 'radio',
          label: 'Noodles',
          value: 'Noodles',
        },
        {
          type: 'radio',
          label: 'Pares',
          value: 'Pares',
        },
        {
          type: 'radio',
          label: 'Platters',
          value: 'Platters',
        },

        {
          type: 'radio',
          label: 'Shakes',
          value: 'Shakes',
        },
        {
          type: 'radio',
          label: 'Silog Meals',
          value: 'Silog Meals',
        },
        {
          type: 'radio',
          label: 'Sizzling Meal W Rice',
          value: 'Sizzling Meal W/ Rice',
        },
        {
          type: 'radio',
          label: 'Snacks',
          value: 'Snacks',
        },
        {
          type: 'radio',
          label: 'Rice Meal',
          value: 'Rice Meal',
        },
      ],
      buttons: [
        {
          text: 'Search',
          handler: (data) => {
            this.category = data;
            this.loadProducts();

            setTimeout(() => {
              this.getAllProducts();
            }, 500);
          },
        },
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
    (await alert).present();
  }
  loadCart() {
    if (sessionStorage.getItem('cart') != null) {
      var thearray = [];
      thearray.push(JSON.parse(sessionStorage.getItem('cart')));

      this.numbers = thearray[0].length;
    } else {
      this.numbers = 0;
    }
  }
  Increase(data) {
    data.Quantity += 1;
    this.loadCart();
  }
  Decrease(data) {
    if (data.Quantity == 1) {
      this.alertCtrl
        .create({
          message: 'Quantity should not be zero',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            },
          ],
        })
        .then((el) => {
          el.present();
          this.loadCart();
        });
    } else {
      data.Quantity -= 1;
      this.loadCart();
    }
  }

  itemsCart: any = [];
  AddtoCart(data) {
    if (data.Quantity > data.Stock) {
      this.alertCtrl
        .create({
          message:
            'The quantity order should not be greater than the stock available',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            },
          ],
        })
        .then((el) => {
          el.present();
          data.Quantity = 1;
        });
    } else {
      var cartData = sessionStorage.getItem('cart');
      if (cartData == null) {
        var theid = data.id;
        let index: number = -1;
        let storageDataGet: any = [];
        storageDataGet.push(data);
        sessionStorage.setItem('cart', JSON.stringify(storageDataGet));

        data.Quantity = 1;
      } else {
        var id = data.id;
        let index: number = -1;

        this.itemsCart = JSON.parse(sessionStorage.getItem('cart'));
        for (let i = 0; i < this.itemsCart.length; i++) {
          if (id == this.itemsCart[i].id) {
            this.itemsCart[i].Quantity = data.Quantity;
            data.Quantity = 1;
            index = i;
            break;
          }
        }

        if (index == -1) {
          this.itemsCart.push(data);

          sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));

          data.Quantity = 1;
        } else {
          sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));

          data.Quantity = 1;
        }
        this.cartItemFunc();
      }
      this.loadCart();
    }
  }
  cartItemFunc() {
    var cartValue = JSON.parse(sessionStorage.getItem('cart'));
    this.cartItem = cartValue.length;
    this.msg.cartSubject.next(this.cartItem);
  }
  checkout() {
    this.router.navigateByUrl('/admincheckout');
  }

  hideDropdown(event) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;

    const rec = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rec.top + 2;
    const leftBoundary = rec.left + 2;
    const rightBoundary = rec.right - 2;

    if (
      xTouch < leftBoundary ||
      xTouch > rightBoundary ||
      yTouch < topBoundary
    ) {
      this.dropdown = false;
    }
  }
}
