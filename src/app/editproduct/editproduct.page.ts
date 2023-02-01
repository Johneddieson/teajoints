import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, IonInput } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
public id: string
registerForm: FormGroup;
  photoLink: any
  withPhoto: boolean = false
  productname;
  stock;
  price;
  currentstock;
  descriptionvalue;
  gramsperodervalue
  category;
  smallpricevalue;
  mediumpricevalue;
  gramsperodersmallvalue;
  gramsperodermediumvalue;
  isDisabled: boolean = false
  public isValid: boolean = false
  public errMsg: string = ''
  public validationMessageObject: object = {}
  @ViewChild(IonInput) myInputVariable: IonInput;
 productReference: AngularFirestoreDocument
 inventoryReference: AngularFirestoreDocument
 sub;
 isdisabled : boolean = false
  constructor(private actRoute: ActivatedRoute, public http: HttpClient, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private afstore: AngularFirestore) {


    this.id = actRoute.snapshot.paramMap.get('id')
    
    this.productReference = this.afstore.doc(`Products/${this.id}`)
    this.inventoryReference = this.afstore.doc(`Inventory/${this.id}`)
    this.sub = this.productReference.valueChanges().subscribe(data => {
      this.productname = data.ProductName
      this.stock = data.Stock.toString()
      this.price = data.UnitPrice
      this.photoLink = data.ImageUrl
      this.withPhoto = true
      this.currentstock = data.Stock.toString()
      this.descriptionvalue = data.Description
      this.gramsperodervalue = data.GramsPerOrder.toString()
      this.category = data.Category
      this.smallpricevalue = data.SmallPrice;
      this.mediumpricevalue = data.MediumPrice;
      this.gramsperodersmallvalue = data.GramsPerOderSmall.toString()
      this.gramsperodermediumvalue = data.GramsPerOderMedium.toString()
    })
   }

  
   ngOnInit() {
  //  this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
    this.registerForm = new FormGroup({
        firstname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        Validators.minLength(5),
      ]),
      description: new FormControl('', [
        Validators.required,
        // this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        // this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
      ]),
     
      gramsonhand: new FormControl('', [
        Validators.required,
            this.customPatternValid({ pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, msg: 'This format is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!-]*)$/, msg: 'Negative is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!_]*)$/, msg: 'Under Score is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!=]*)$/, msg: 'Equal is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!+]*)$/, msg: 'Plus is not allowed' }),
             this.customPatternValid({ pattern: /^([^.?!.]*)$/, msg: 'Period is not allowed' }),
      
    ]),

    gramsperorder: new FormControl('', [
      Validators.required,
           this.customPatternValid({ pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, msg: 'This format is not allowed' }),
           this.customPatternValid({ pattern: /^([^.?!-]*)$/, msg: 'Negative is not allowed' }),
           this.customPatternValid({ pattern: /^([^.?!_]*)$/, msg: 'Under Score is not allowed' }),
           this.customPatternValid({ pattern: /^([^.?!=]*)$/, msg: 'Equal is not allowed' }),
           this.customPatternValid({ pattern: /^([^.?!+]*)$/, msg: 'Plus is not allowed' }),
           this.customPatternValid({ pattern: /^([^.?!.]*)$/, msg: 'Period is not allowed' }),
    
  ]),

  unitprice: new FormControl('', [
  Validators.required,
  this.customPatternValid({ pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, msg: 'This format is not allowed' }),
  this.customPatternValid({ pattern: /^([^-]*)$/, msg: 'Negative is not allowed' }),
  this.customPatternValid({ pattern: /^([^?!_]*)$/, msg: 'Under Score is not allowed' }),
  this.customPatternValid({ pattern: /^([^?!=]*)$/, msg: 'Equal is not allowed' }),
  this.customPatternValid({ pattern: /^([^?!+]*)$/, msg: 'Plus is not allowed' }),

]),
smallprice: new FormControl('', [
  Validators.required,
  this.customPatternValid({
    pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
    msg: 'This format is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^-]*)$/,
    msg: 'Negative is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^?!_]*)$/,
    msg: 'Under Score is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^?!=]*)$/,
    msg: 'Equal is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^?!+]*)$/,
    msg: 'Plus is not allowed',
  }),
]),
mediumprice: new FormControl('', [
  Validators.required,
  this.customPatternValid({
    pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
    msg: 'This format is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^-]*)$/,
    msg: 'Negative is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^?!_]*)$/,
    msg: 'Under Score is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^?!=]*)$/,
    msg: 'Equal is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^?!+]*)$/,
    msg: 'Plus is not allowed',
  }),
]),
gramsperodersmall: new FormControl('', [
  Validators.required,
  // Validators.pattern("^[0&9]{2}[0-9]{9}")
  //this.customPatternValid({ pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, msg: 'This format is not allowed' }),
  this.customPatternValid({
    pattern: /^([^.?!-]*)$/,
    msg: 'Negative is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!_]*)$/,
    msg: 'Under Score is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!=]*)$/,
    msg: 'Equal is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!+]*)$/,
    msg: 'Plus is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!.]*)$/,
    msg: 'Period is not allowed',
  }),
  this.customPatternValid({
    pattern: /^[1-9]\d*$/,
    msg: 'This format is not allowed',
  }),
]),
gramsperodermedium: new FormControl('', [
  Validators.required,
  // Validators.pattern("^[0&9]{2}[0-9]{9}")
  //this.customPatternValid({ pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, msg: 'This format is not allowed' }),
  this.customPatternValid({
    pattern: /^([^.?!-]*)$/,
    msg: 'Negative is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!_]*)$/,
    msg: 'Under Score is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!=]*)$/,
    msg: 'Equal is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!+]*)$/,
    msg: 'Plus is not allowed',
  }),
  this.customPatternValid({
    pattern: /^([^.?!.]*)$/,
    msg: 'Period is not allowed',
  }),
  this.customPatternValid({
    pattern: /^[1-9]\d*$/,
    msg: 'This format is not allowed',
  }),
]),
    })

    
  }
  customPatternValid(config: any): ValidatorFn {
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
        this.myInputVariable.value = ""
      
      }
  fileChanged(event) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    //00fb1c6ab7c377f68517
    
    //this for my github account 760e7038539ea9dd5176

    //pukikinginamo@gmail.com account
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
  checkInventoryIfnotUndefined() {
    var check;
    this.inventoryReference.valueChanges().subscribe(data => {

      check = data
    })

return check
  }


  async submit () {
    var datetime = await moment(new Date()).format("MM-DD-YYYY hh:mm A")
    var validation = Object.assign(this.validation())


    if (validation.isValid === false) 
    {
      var errorAlert = await this.alertCtrl.create({
        header: 'This fields must be in the correct format',
            message: `<b>${validation.errMessage}</b>`,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
      })
      await errorAlert.present()
    } 
    else 
    {
      var alertSuccess = await this.alertCtrl.create({
        message: 'Product added successfully!',
                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel'
                    }
                  ]
      })

      await alertSuccess.present()
      await this.productReference.update({
        Description: this.registerForm.value.description,
        Stock: parseInt(this.registerForm.value.gramsonhand),
        GramsPerOrder: this.category != "Milktea" ? parseInt(this.registerForm.value.gramsperorder) : 0,
        UnitPrice: this.category != "Milktea" ? this.registerForm.value.unitprice.toString() : "0",
        SmallPrice: this.category == "Milktea" ? this.registerForm.value.smallprice.toString() : "0",
        MediumPrice: this.category == "Milktea" ? this.registerForm.value.mediumprice : "0",
        GramsPerOderSmall: this.category == "Milktea" ? parseInt(this.registerForm.value.gramsperodersmall) : 0,
        GramsPerOderMedium: this.category == "Milktea" ? parseInt(this.registerForm.value.gramsperodermedium) : 0,
        ImageUrl: this.photoLink,
      })
 
      await this.afstore.collection('Inventory').add({
        Datetime: datetime,
        Category: this.category,
        ProductName: this.productname,
        Quantity: parseInt(this.registerForm.value.gramsonhand),
        UnitPrice: this.category != "Milktea" ? this.registerForm.value.unitprice.toString() : "0",
        ImageUrl: this.photoLink,
        GramsPerOrder: this.category != "Milktea" ? parseInt(this.registerForm.value.gramsperorder) : 0,
        Description: this.registerForm.value.description,
        SmallPrice: this.category == "Milktea" ? this.registerForm.value.smallprice : "0",
        MediumPrice:  this.category == "Milktea" ? this.registerForm.value.mediumprice : "0",
        DatetimeToSort: new Date(),
        ProductId: this.id,
        GramsPerOderSmall: this.category == "Milktea" ? parseInt(this.registerForm.value.gramsperodersmall) : 0,
        GramsPerOderMedium: this.category == "Milktea" ? parseInt(this.registerForm.value.gramsperodermedium) : 0,
      })
    }

   
  }

   validation() 
  {
    var firstnamevalidationiserror =  this.registerForm.controls.firstname.invalid    
    var descriptionvalidationiserror =  this.registerForm.controls.description.invalid
    var gramsnonhandvalidationiserror =  this.registerForm.controls.gramsonhand.invalid
    var gramsperodervalidationiserror =  this.registerForm.controls.gramsperorder.invalid
    var unitpricevalidationiserror =  this.registerForm.controls.unitprice.invalid
    var smallpricevalidationiserror =  this.registerForm.controls.smallprice.invalid
    var mediumpricevalidationiserror =  this.registerForm.controls.mediumprice.invalid
    var gramsperodersmallvalidationiserror =  this.registerForm.controls.gramsperodersmall.invalid
    var gramsperodermediumvalidationiserror =  this.registerForm.controls.gramsperodermedium.invalid


    // console.log(firstnamevalidationiserror)
    // console.log(descriptionvalidationiserror)
    // console.log(gramsnonhandvalidationiserror)
    // console.log(gramsperodervalidationiserror)
    // console.log(unitpricevalidationiserror)
    // console.log(smallpricevalidationiserror)
    // console.log(mediumpricevalidationiserror)
    // console.log(gramsperodersmallvalidationiserror)
    // console.log(gramsperodermediumvalidationiserror)

    if (this.category == "Milktea")
    {
      if (
         descriptionvalidationiserror === true || gramsnonhandvalidationiserror === true
        ||  smallpricevalidationiserror === true
        || mediumpricevalidationiserror === true || gramsperodersmallvalidationiserror
        || gramsperodermediumvalidationiserror)
        {
          this.errMsg = ''
          this.isValid = false
          //this.errMsg +=  firstnamevalidationiserror === true ? "• Name<br>" : ""
          this.errMsg += descriptionvalidationiserror === true ? "• Description<br>" : ""
          this.errMsg += gramsnonhandvalidationiserror === true ? "• Grams on hand<br>" : ""
          this.errMsg += smallpricevalidationiserror === true ? "• Small unit price<br>" : ""
          this.errMsg +=  mediumpricevalidationiserror === true ? "• Medium unit price<br>": ""
          this.errMsg +=  gramsperodersmallvalidationiserror === true ? "• Grams per order small<br>": ""
          this.errMsg +=  gramsperodermediumvalidationiserror === true ? "• Grams per order medium<br>": ""
        }
        else 
        {
          this.isValid =  true
          this.errMsg = ''
        }
    } 
    else
    {
      if (
        descriptionvalidationiserror  === true || gramsnonhandvalidationiserror === true
        || gramsperodervalidationiserror === true || unitpricevalidationiserror === true)
        {
          this.errMsg = ''
          this.isValid =  false
          //this.errMsg +=  firstnamevalidationiserror === true ? "• Name<br>" : ""
          this.errMsg += descriptionvalidationiserror === true ? "• Description<br>" : ""
          this.errMsg += unitpricevalidationiserror === true ? "• Unit price<br>" : ""
          this.errMsg += gramsnonhandvalidationiserror === true ? "• Grams on hand<br>" : ""
          this.errMsg += gramsperodervalidationiserror === true ? "• Grams per order<br>" : ""
      
        }
        else 
        {
          this.isValid =  true
          this.errMsg = ''
        }
    }
this.validationMessageObject = {
  isValid: this.isValid,
  errMessage: this.errMsg
}
    return this.validationMessageObject
  }
}
