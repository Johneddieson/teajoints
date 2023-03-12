import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceService } from '../auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessengerService } from '../messenger.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
private unsubscriber : Subject<void> = new Subject<void>();
  Email1: any;
  Password1: any;
  ishide = false;
  continueAsCustomer
  isthisadmin = false
  public aFormGroup: FormGroup;
  public hideSignupButton: boolean = false
  public emailVerified: boolean = false
  public user
  constructor(private navCtrl: NavController,private auth: AuthServiceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private formBuilder: FormBuilder,
    private msg: MessengerService
    ) {

        this.aFormGroup = this.formBuilder.group
        ({
          email: 
          [
            '',
            [
              Validators.required,
              Validators.email 
            ]
          ],
          password: 
          [
            '',
            [
              Validators.required, 
              Validators.pattern(/(?=.*[ -\/:-@\[-\`{-~]{1,})(?=.*[a-z])(?=.*[A-Z]).{8,}/),
              this.aLowerCasePatternValid({pattern: /^([^a-z]*)$/, msg: 'A lowercase' }),
            this.aUpperCasePatternValid({pattern: /^([^A-Z]*)$/, msg: 'A uppercase' }),
            this.aSpecialCharacterPatternValid({pattern: /^([^[ -\/:-@\[-\`{-~]{1,}]*)$/, msg: 'A special character' }),
            ]
          ]
        })
       
   

      }


// authState()
// {
//   this.afauth.authState.subscribe(Data => 
//     { 
//       if (Data)
//       {   
//         this.user = Data
//         this.emailVerified = Data.emailVerified;    
//       this.hideSignupButton = true
//       } else
//       {
//         this.hideSignupButton = false
//       }
//     })
// }

    get f ()
    {
      return this.aFormGroup.controls
    }
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

  gotosignin() {
    this.navCtrl.navigateForward('login');
  }

  // async SignUp2()
  // {
  //   alert(this.emailVerified)
  //   if (!this.emailVerified)
  //   {
  //     var loadingController = await this.loadingCtrl.create
  //     ({
  //       message: 'Registering User...',
  //       spinner: 'lines-sharp'
  //     })
  //     await loadingController.present()
  
  //     this.auth.SignUp(this.Email1, this.Password1)
  //     .then((res) => 
  //     {
  //       res.user.sendEmailVerification();
  //       res.user.updateProfile({
  //         displayName: 'customer'
  //       })  
  //     this.afstore.doc(`users/${res.user.uid}`).set({
  //       Email: this.Email1,
  //       Uid: res.user.uid,
  //       FirstName: "",
  //       LastName: "",
  //       Address1: "",
  //       Address2: "",
  //       PhoneNumber: ""
  //     }).then(suc => {
      
  //     }).catch(err => {
  //       console.log("err", err)
  //     })
      
  //     setTimeout(async () => {
  //         await loadingController.dismiss();
  //         var alertCtrl = await this.alertCtrl.create
  //         ({
  //           message: 'Please verify your email so you can continue shopping our products. After verified, please reload the page and you can ready to go, thank you!',
  //           buttons: 
  //           [
  //             {
  //               text: 'Ok',
  //               role: 'cancel'
  //             }
  //           ]
  //         })
  //         await alertCtrl.present()
  //     }, 3000)
  //     }).catch(async err => 
  //       {
  //         var alertControllerError = await this.alertCtrl.create
  //         ({
  //           message: err.message,
  //           buttons: 
  //           [
  //             {
  //               text: 'Close',
  //               role: 'cancel'
  //             }
  //           ]
  //         })
  //        await alertControllerError.present()
  //       })
  //   }
  //   else 
  //   {
  //          this.afauth.authState.subscribe(async Data => 
  //           {
  //             if (Data)
  //                   {       
  //                   this.hideSignupButton = true
          
  //                   var loading = await this.loadingCtrl.create
  //                     ({
  //                       message: 'Redirecting to home...',
  //                       spinner: 'bubbles'
  //                     })
  //                     await loading.present();
  //                      sessionStorage.setItem('user', JSON.stringify(Data))
  //                     setTimeout(async () => {
  //                     await loading.dismiss()
  //                     if (Data.displayName == 'admin')
  //                     {
  //                       this.router.navigateByUrl('/adminpage')
  //                     }
  //                     else 
  //                     {
  //                       this.router.navigateByUrl('/home')
  //                     }
  //                     this.Email1 = ''
  //                     this.Password1 = ''
  //                   }, 3000)
  //                 }
  //           })
  //   }
    
  // }

//       SignUp() {
//       this.auth.SignUp(this.Email1, this.Password1).then(res => {
//   this.loadingCtrl.create({
//   message: 'Registering User...',
 
// }).then(el => {
//   el.present()
//   res.user.updateProfile({
//     displayName: 'customer'
//   })  

// sessionStorage.setItem('user', JSON.stringify(res.user))

// this.afstore.doc(`users/${res.user.uid}`).set({
//   Email: this.Email1,
//   Uid: res.user.uid,
//   FirstName: "",
//   LastName: "",
//   Address1: "",
//   Address2: "",
//   PhoneNumber: ""
// }).then(suc => {

// }).catch(err => {
//   console.log("err", err)
// })

// setTimeout(() => {
//   el.dismiss()
//   this.router.navigateByUrl('/home')
//   this.Email1 = ''
//   this.Password1 = ''
// }, 3000)

// })

// }).catch(err => {
//   this.loadingCtrl.create({
//     message: 'Registering User...',
//   }).then(el => {
//     el.present()
//   setTimeout(() => {
//     el.dismiss()
//     this.alertCtrl.create({
//       message: err.message,
      
//     }).then(el => {
//       el.present()
//     })

//   }, 3000)
//   })
// })      
//     }

    //  myEmailWasAlreadyVerified()
    // {
    //   this.afauth.authState.subscribe(async Data => 
    //     { 
    //       if (Data)
    //       {       
    //       this.hideSignupButton = true

    //       var loading = await this.loadingCtrl.create
    //         ({
    //           message: 'Redirecting to home...',
    //           spinner: 'bubbles'
    //         })
    //         await loading.present();
    //          sessionStorage.setItem('user', JSON.stringify(Data))
    //         setTimeout(async () => {
    //         await loading.dismiss()
    //         if (Data.displayName == 'admin')
    //         {
    //           this.router.navigateByUrl('/adminpage')
    //         }
    //         else 
    //         {
    //           this.router.navigateByUrl('/home')
    //         }
    //         this.Email1 = ''
    //         this.Password1 = ''
    //       }, 3000)


    //       // if (Data.emailVerified == false)
    //       // {
    //       //   var alertCtrl = await this.alertCtrl.create
    //       //   ({
    //       //     message: 'Please verify your email first before shopping!',
    //       //     buttons: 
    //       //     [
    //       //       {
    //       //         text: 'Ok',
    //       //         role: 'cancel'
    //       //       }
    //       //     ]
    //       //   })
    //       //   await alertCtrl.present();
    //       // }
    //       // else 
    //       // {
    //       //   var loading = await this.loadingCtrl.create
    //       //   ({
    //       //     message: 'Redirecting to home...',
    //       //     spinner: 'bubbles'
    //       //   })
    //       //   await loading.present();
    //       //    sessionStorage.setItem('user', JSON.stringify(Data))
    //       //   setTimeout(async () => {
    //       //   await loading.dismiss()
    //       //   if (Data.displayName == 'admin')
    //       //   {
    //       //     this.router.navigateByUrl('/adminpage')
    //       //   }
    //       //   else 
    //       //   {
    //       //     this.router.navigateByUrl('/home')
    //       //   }
    //       //   this.Email1 = ''
    //       //   this.Password1 = ''
    //       // }, 3000)
    //       // }
    //     } 
    //     else
    //       {
    //         this.hideSignupButton = false
    //       }
    //     })
    // }
    reload()
    {
      window.location.reload()
    }

    //if there is an lowercase in value password validation
  thereIsLowerCaseCharacters: boolean = false
  aLowerCasePatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      //console.log('wew', config);
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) 
      {
        this.thereIsLowerCaseCharacters = true
        
      } else {
        this.thereIsLowerCaseCharacters = false
      }
    };
  }

  //if there is an uppercase in value password validation
  thereIsUpperCaseCharacters: boolean = false
  aUpperCasePatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) 
      {
        this.thereIsUpperCaseCharacters = true
        
      } else {
        this.thereIsUpperCaseCharacters = false
      }
    };
  }

  //minimum of 8 character on password validation
  minimum8Characters: boolean = false
  aMinimum8CharactersPatternValid(config: any)
  {
    const query = config.target.value;
    if (query.length >= 8)
     {
      this.minimum8Characters = true
     }
     else 
     {
      this.minimum8Characters = false
     }
  }

   //if there is an specialcharacter in value password validation
   thereIsSpecialCharacters: boolean = false
   aSpecialCharacterPatternValid(config: any): ValidatorFn | any {
     return (control: FormControl) => {
       let urlRegeX: RegExp = config.pattern;
       if (control.value && !control.value.match(urlRegeX)) 
       {
         this.thereIsSpecialCharacters = true
         
       } else {
         this.thereIsSpecialCharacters = false
       }
     };
   }

    //if there is an email in value of email validation
  thereIsEmailCharacters: boolean = false
  aEmailPatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) 
      {
        this.thereIsEmailCharacters = true
        
      } else {
        this.thereIsEmailCharacters = false
      }
    };
  }

  async SignUp2()
  {
    await this.auth.SignUp(this.Email1, this.Password1)
    .then(async (success) => 
    {
            success.user.updateProfile({
              displayName: 'customer',
            });
            this.afstore
              .doc(`users/${success.user.uid}`)
              .set({
                Email: this.Email1,
                Uid: success.user.uid,
                FirstName: '',
                LastName: '',
                Address1: '',
                Address2: '',
                PhoneNumber: '',
              })
              .then((suc) => {})
              .catch((err) => {
                console.log('err', err);
              });
      success.user.sendEmailVerification();
      var alertController = await this.alertCtrl.create
      ({
        message: `We've sent you an email verification to ${this.Email1}, Once it is verified, you can go to login and use your account.`,
        buttons: 
        [
          {
            text: 'Ok',
            handler: () => 
            {
              this.Email1 = '';
              this.Password1 = ''
              this.minimum8Characters = false
              this.afauth.signOut();
            }
          }
        ]         
      })
      await alertController.present();
    }).catch(async (err) => 
    {
      var alertController = await this.alertCtrl.create
      ({
        message: JSON.stringify(err),
        buttons: 
        [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]         
      })
      await alertController.present();
    })
  }
}
