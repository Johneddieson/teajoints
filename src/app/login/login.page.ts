import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Email1: any;
  Password1: any;
  ishide = false;
  continueAsCustomer
  isthisadmin = false
  public hideSignupButton: boolean = false
  public emailVerified: boolean = false
  public user: any = ''
  public isEmailVerified: boolean = false
  constructor(private navCtrl: NavController,private auth: AuthServiceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone
    ) {
      
          //this.angularfirestoreauth();
    }

    // async angularfirestoreauth()
    // {
    //   await this.afauth.authState.subscribe(Data => 
    //     {
          
    //       //this.user = Data
    //       //this.emailVerified = Data.emailVerified;    
      
    //       if (Data)
    //       {   
    //         this.user = Data
    //       this.emailVerified = Data.emailVerified;    
    //       this.hideSignupButton = true
          
    //         if (Data.emailVerified == false)
    //         {
    //           this.isEmailVerified = false
    //         }
    //         else 
    //         {
    //           this.emailVerified = true
    //         }
       
    //       } 
    //       else
    //       {
    //         this.hideSignupButton = false
    //         this.user = undefined
    //       }
    //     })
    // }

  ngOnInit() {
 
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick()
            var thesession = JSON.parse(sessionStorage.getItem('user'))
            if (thesession != null) {
              this.ishide = true
              if (thesession.displayName == "customer") {
                this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`
                this.isthisadmin = false

              } else {
                this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`
                this.isthisadmin = true

              }
            } else {
              this.ishide = false
            }
           
        }, 0)
      })
    })
  }
  ResetPassword() {
this.alertCtrl.create({
  header: 'Reset Password',
  inputs: [
    {
      name: 'Email',
      placeholder: 'Please type your email',
      type: 'email'
    }
  ],
  buttons: [
    {
      text: 'Ok',
      handler: (data) => {
        console.log("hahaha", data)
        this.auth.ForgotPassword(data.Email)
        .then(success => {
          this.alertCtrl.create({
            header: 'Success',
            message: 'The reset password code has been sent to your email'
          }).then(els => {
            els.present()
          })
        }).catch(error => {
          this.alertCtrl.create({
            header: 'Error',
            message: "Email not found"
          }).then(els2 => {
            els2.present()
          })
        })
      }
    }
  ]
}).then(El => {
  El.present()
})

   
  }
 
  navigateadmin() {
    this.router.navigateByUrl('adminpage')
  }
  navigatecustomer() {
    this.router.navigateByUrl('home')
  }

  gotosignup() {
    this.navCtrl.navigateForward('signup');
  }
  reload()
    {
      window.location.reload()
    }

    LogIn()
    {
        this.auth.SignIn(this.Email1, this.Password1)
        .then(async (success) => 
        {
            if (success.user.emailVerified == false)
            {
                var alertController = await this.alertCtrl.create
                ({
                  message: `Your email is not yet verified, Do you want to send an email verification
                  to this email? "${this.Email1}"`,
                  buttons: 
                  [
                    {
                      text: 'Yes',
                      handler: async () => 
                      {
                        var alertSent = await this.alertCtrl.create
                        ({
                          message: 'Email verification has been sent to your email, Please verify it first so you can proceed.',
                          buttons: [
                            {
                              text: 'Ok',                              
                              role:'cancel'
                            }
                          ]
                        })
                        await alertSent.present();
                        this.afauth.signOut();
                        success.user.sendEmailVerification();
                      }
                    },
                    {
                      text: 'No',
                      role: 'cancel'
                    }
                  ]
                })
                await alertController.present();
            }
            else 
            {
              var successLoading = await this.loadingCtrl.create
              ({
                message: 'Logging in...',
                spinner: 'lines-sharp'
              })   
              await successLoading.present();

              setTimeout(async () => {
                await successLoading.dismiss();
                if (success.user.displayName == 'admin')
                {
                  this.router.navigateByUrl('adminpage')
                }
                else 
                {
                  this.router.navigateByUrl('home')
                }
                sessionStorage.setItem('user', JSON.stringify(success.user));
                
                //email = '';
                //password = ''
                this.Email1 = ''
                this.Password1 = ''
              }, 3000);
            }
        })
        .catch(async err => 
          {
              var alertError = await this.alertCtrl.create
              ({
                message: err.message,
                buttons: 
                [
                  {
                    text: 'Close',
                    role: 'cancel'
                  }
                ]
              })
              await alertError.present();
          })      
    }
}
