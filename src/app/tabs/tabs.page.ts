import { LocationStrategy } from '@angular/common';
import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  notificationsReference: AngularFirestoreCollection
  sub
notificationsList : any[] = []
notifCounts = 0
  constructor(private router: Router, private afstore: AngularFirestore,
    private afauth: AngularFireAuth, private loadingCtrl: LoadingController,
    private locationStrategy: LocationStrategy, private auth: AuthServiceService,
    private alertCtrl: AlertController,
    private applicationRef: ApplicationRef,
    private zone: NgZone) {
     

    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        if (data.displayName == 'admin') {
          router.navigateByUrl('adminpage')
        } else {
          router.navigateByUrl('tabs')
        }

        this.notificationsReference = this.afstore.collection(`users/${data.uid}/notifications`)

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
    //     history.pushState(null, null, location.href);
    // this.locationStrategy.onPopState(() => {
    //   history.pushState(null, null, location.href);
    // })
    // this.router.events.subscribe((d) => {
    //   console.log("pota", d)
    //   this.zone.run(() => {
    //     setTimeout(() => {
    //       this.applicationRef.tick()
    //         var thesession = JSON.parse(sessionStorage.getItem('user'))
    //         console.log("current user", thesession)
    //         if (thesession != null) {
             
    //           if (thesession.displayName == "customer") {
                
    //             this.router.navigateByUrl('tabs')
      
    //           } else {
    //             this.router.navigateByUrl('adminpage')

    //           }
    //         } else {
    //         }
           
    //     }, 0)
    //   })
    // })
  }
  logout() {
    this.alertCtrl.create({
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.auth.SignOut()
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(el => {
      el.present()
    })
  }
}
