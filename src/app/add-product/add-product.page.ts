import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import * as moment from 'moment';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
 
export class AddProductPage implements OnInit {
  registerForm: FormGroup;
  photoLink: any
  withPhoto: boolean = false
  hideSizeDropdown: boolean  = false
  hideFlavorsDropdown: boolean  = false
  @ViewChild(IonInput) myInputVariable: IonInput;
  constructor(public http: HttpClient, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private afstore: AngularFirestore) {
   
   }

  ngOnInit() {
    this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
    this.registerForm = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Number is not allowed' }),
        Validators.minLength(5),
        // Validators.maxLength(10),
      ]),
      size: new FormControl('', [
        //Validators.required,
      
      ]),
      // flavors: new FormControl('', [
      //   //Validators.required,
      
      // ]),
      firstname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Number is not allowed' }),
        Validators.minLength(4),
        // Validators.maxLength(10),
      ]),
   
      cellphonenumber: new FormControl('', [
        Validators.required,
        // Validators.pattern("^[0&9]{2}[0-9]{9}")
             //this.customPatternValid({ pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, msg: 'This format is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!-]*)$/, msg: 'Negative is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!_]*)$/, msg: 'Under Score is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!=]*)$/, msg: 'Equal is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!+]*)$/, msg: 'Plus is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!.]*)$/, msg: 'Period is not allowed' }),
             this.customPatternValid({ pattern: /^[1-9]\d*$/, msg: 'This format is not allowed' }),
      
    ]),
      password: new FormControl('', [
  Validators.required,
  this.customPatternValid({ pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, msg: 'This format is not allowed' }),
  this.customPatternValid({ pattern: /^([^-]*)$/, msg: 'Negative is not allowed' }),
  this.customPatternValid({ pattern: /^([^?!_]*)$/, msg: 'Under Score is not allowed' }),
  this.customPatternValid({ pattern: /^([^?!=]*)$/, msg: 'Equal is not allowed' }),
  this.customPatternValid({ pattern: /^([^?!+]*)$/, msg: 'Plus is not allowed' }),

])
    })
  }
  customPatternValid(config: any): ValidatorFn {
    console.log("wew", config)
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null
      }
    }
      }
      reset() {
        console.log("wew", 
        this.myInputVariable.value)

        this.myInputVariable.value = ""
      
      }
  fileChanged(event) {
    const files = event.target.files
    console.log("the files", files)
    const data = new FormData()
    data.append('file', files[0])
    //00fb1c6ab7c377f68517
    // data.append('UPLOADCARE_PUB_KEY', '760e7038539ea9dd5176')
    data.append('UPLOADCARE_PUB_KEY', 'd215c12fb1b590263b07')
    this.http.post('https://upload.uploadcare.com/base/', data).subscribe((events: any) => {
      var json = {events}
      for (var prop in json) {
        console.log("wew", json[prop].file)
        for (const variables of files) {
          this.photoLink = `https://ucarecdn.com/${json[prop].file}/${variables.name}`

        }
      }
    this.withPhoto = true
    })
  }
  submit() {
      if (this.withPhoto == false) {
        this.alertCtrl.create({
          message: 'Please Add a Photo',
          buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
          ]
        }).then(els2 => {
          els2.present()
        })
    } else if (this.registerForm.value.size == "" && this.registerForm.value.category.toLowerCase() == "milktea") {
      this.alertCtrl.create({
        message: 'Please choose size',
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
    else {
      if (this.registerForm.value.category.toLowerCase() == "snacks") {
        this.alertCtrl.create({
          message: 'Do you want to choose flavor?',
          buttons: [
          {
            text: 'Yes',
            handler: data => {
            
              this.alertCtrl.create({
                header: 'Choose Flavor',
                inputs: [
                  {
                    type: 'radio',
                    label: 'Cheese',
                    value: 'Cheese'
                  },
                  {
                    type: 'radio',
                    label: 'Sour Cream',
                    value: 'Sour Cream'
                  },
                  {
                    type: 'radio',
                    label: 'BBQ',
                    value: 'BBQ'
                  } 
                ],
                buttons: [
                  {
                    text: 'Submit',
                    handler: data => {
                      this.loadingCtrl.create({
                        message: 'Creating New Product'
                      }).then(el => {
                        el.present()
                  
                        
                        this.afstore.collection('Products').add({
                          Category:this.registerForm.value.category,
                          ProductName: this.registerForm.value.category.toLowerCase() == "milktea" ?  `${this.registerForm.value.firstname} (${this.registerForm.value.size})` : this.registerForm.value.firstname + " " + data,
                          Stock: parseInt(this.registerForm.value.cellphonenumber),
                          UnitPrice: this.registerForm.value.password,
                          ImageUrl: this.photoLink,
                          Quantity: 1
                        })
                        var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
                        this.afstore.collection('Inventory').add({
                          Quantity: parseInt(this.registerForm.value.cellphonenumber) *  1,
                          Datetime: datetime,
                          read: false,
                          Destination: "Admin",
                          ProductName: this.registerForm.value.category.toLowerCase() == "milktea" ?  `${this.registerForm.value.firstname} (${this.registerForm.value.size})` : this.registerForm.value.firstname + " " + data,
                          UnitPrice: this.registerForm.value.password,
                          ImageUrl: this.photoLink,
                          DatetimeToSort: new Date()
                        })
                  
                        setTimeout(() => {
                          el.dismiss()   
                          this.registerForm.reset()
                          this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
                          this.alertCtrl.create({
                            header: 'Officially Created',
                            message: 'You created the product successfully',
                            buttons: [
                              {
                                text: 'Ok',
                                role: 'cancel'
                              }
                            ]
                          }).then(els => {
                            els.present()
                            this.withPhoto = false
                            this.myInputVariable.value = "";
                          }).catch(err => {
                  
                          })
                        }, 3000)
                         
                      }).catch(err => {
                  
                      })
                      
                    }
                  },
                  {
                    text: 'Close',
                    role: 'cancel'
                  }
                ]
              }).then(els10 => {
                els10.present()
              })
              
            }
          },
          {
            text: 'No Thanks',
            handler: data => {
              this.loadingCtrl.create({
                message: 'Creating New Product'
              }).then(el => {
                el.present()
          
                
                this.afstore.collection('Products').add({
                  Category:this.registerForm.value.category,
                  ProductName: this.registerForm.value.category.toLowerCase() == "milktea" ?  `${this.registerForm.value.firstname} (${this.registerForm.value.size})` : this.registerForm.value.firstname,
                  Stock: parseInt(this.registerForm.value.cellphonenumber),
                  UnitPrice: this.registerForm.value.password,
                  ImageUrl: this.photoLink,
                  Quantity: 1
                })
                var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
                this.afstore.collection('Inventory').add({
                  Quantity: parseInt(this.registerForm.value.cellphonenumber) *  1,
                  Datetime: datetime,
                  read: false,
                  Destination: "Admin",
                  ProductName: this.registerForm.value.category.toLowerCase() == "milktea" ?  `${this.registerForm.value.firstname} (${this.registerForm.value.size})` : this.registerForm.value.firstname,
                  UnitPrice: this.registerForm.value.password,
                  ImageUrl: this.photoLink,
                  DatetimeToSort: new Date()
                })
          
                setTimeout(() => {
                  el.dismiss()   
                  this.registerForm.reset()
                  this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
                  this.alertCtrl.create({
                    header: 'Officially Created',
                    message: 'You created the product successfully',
                    buttons: [
                      {
                        text: 'Ok',
                        role: 'cancel'
                      }
                    ]
                  }).then(els => {
                    els.present()
                    this.withPhoto = false
                    this.myInputVariable.value = "";
                  }).catch(err => {
          
                  })
                }, 3000)
                 
              }).catch(err => {
          
              })
            }
          }
          ]
        }).then(els5 => {
          els5.present()
        })
      } 
      else {

        this.loadingCtrl.create({
          message: 'Creating New Product'
        }).then(el => {
          el.present()
    
          
          this.afstore.collection('Products').add({
            Category:this.registerForm.value.category,
            ProductName: this.registerForm.value.category.toLowerCase() == "milktea" ?  `${this.registerForm.value.firstname} (${this.registerForm.value.size})` : this.registerForm.value.firstname,
            Stock: parseInt(this.registerForm.value.cellphonenumber),
            UnitPrice: this.registerForm.value.password,
            ImageUrl: this.photoLink,
            Quantity: 1
          })
          var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
          this.afstore.collection('Inventory').add({
            Quantity: parseInt(this.registerForm.value.cellphonenumber) *  1,
            Datetime: datetime,
            read: false,
            Destination: "Admin",
            ProductName: this.registerForm.value.category.toLowerCase() == "milktea" ?  `${this.registerForm.value.firstname} (${this.registerForm.value.size})` : this.registerForm.value.firstname,
            UnitPrice: this.registerForm.value.password,
            ImageUrl: this.photoLink,
            DatetimeToSort: new Date()
          })
    
          setTimeout(() => {
            el.dismiss()   
            this.registerForm.reset()
            this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
            this.alertCtrl.create({
              header: 'Officially Created',
              message: 'You created the product successfully',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel'
                }
              ]
            }).then(els => {
              els.present()
              this.withPhoto = false
              this.myInputVariable.value = "";
            }).catch(err => {
    
            })
          }, 3000)
           
        }).catch(err => {
    
        })
      }
    
  }
  }
 
  handleChange(event) {
    const category = event.target.value.toLowerCase();
    if (category.toLowerCase() == "milktea") {
      this.hideSizeDropdown = true
      
    } else {
      this.hideSizeDropdown = false
    }
    // if (category.toLowerCase() == "snacks") {
    //   this.hideFlavorsDropdown = true
      
    // } else {
    //   this.hideFlavorsDropdown = false
      
    // }
  }
}
