import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, IonInput, IonModal } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

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
 materialReference: AngularFirestoreCollection
 materialEachElementReference: AngularFirestoreDocument
 sub;
 sub2;
 isdisabled : boolean = false
 public materialArray : any[] = []
 public arrayForMaterial = []
existingMaterials = [];
@ViewChild(IonModal) modal: IonModal;
  constructor(private actRoute: ActivatedRoute, public http: HttpClient, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private afstore: AngularFirestore) {
    
      this.implementReactiveForm()
    this.id = actRoute.snapshot.paramMap.get('id')
    
    this.productReference = this.afstore.doc(`Products/${this.id}`)
    this.inventoryReference = this.afstore.doc(`Inventory/${this.id}`)
     this.productReference.valueChanges().subscribe(data => {
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
      //var samplearr = ['KxhLfE6UynY5e2qNVCQL', 'VsROG3GBGRyjZxWNisBv']
      // data.Materials.forEach(fe => 
      //   {
      //     var exist = `${fe.itemId},`
      //     console.log("existing materials of specific product", fe.itemId)
      //   this.registerForm.controls.materials.setValue(exist)
      //   })

      var materialsStringId = data.Materials.length <= 0 ? '' : data.Materials.map(function(e) {return e.itemId})
      this.existingMaterials = data.Materials
      this.registerForm.controls.materials.setValue(materialsStringId)
      //this.setMaterials()
    })



    
    this.materialReference = this.afstore.collection(`Materials`, ref => ref.orderBy('Itemname'))
        this.sub2 = this.materialReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
            this.materialArray = data
          })
   }

  
   ngOnInit() {  
  }
  setMaterials()
  {
    this.arrayForMaterial = this.registerForm.value.materials
    //assigned object for material list string
    this.arrayForMaterial = this.arrayForMaterial.map((i, index) => {
      return Object.assign(
        {},
        {
          itemId: i,
          gramsperordersmall : this.existingMaterials.filter(f => f.itemId === i).length > 0 ? 
          parseInt(this.existingMaterials.filter(f => f.itemId === i).map(function (e) {return e.gramsperordersmall}).toString())
          : 0,
          gramsperordermedium : this.existingMaterials.filter(f => f.itemId === i).length > 0 ? 
          parseInt(this.existingMaterials.filter(f => f.itemId === i).map(function (e) {return e.gramsperordermedium}).toString())
          : 0,
          gramsperorder :  this.existingMaterials.filter(f => f.itemId === i).length > 0 ? 
          parseInt(this.existingMaterials.filter(f => f.itemId === i).map(function (e) {return e.gramsperorder}).toString())
          : 0,   
        }
      );
    });
    //get the itemname of materials by using their uniqueidentifier ID
    this.arrayForMaterial.map((i, index) => {
      this.materialEachElementReference = this.afstore.doc(
        `Materials/${i.itemId}`
      );

      this.materialEachElementReference
        .get()
        .pipe(
          map((actions) => {
            return actions.data() as any;
          })
        )
        .subscribe((data) => {
          i.itemName =  data.Itemname;
        });
   
        
      });
    //console.log("the final array", this.arrayForMaterial)
  }
  
  implementReactiveForm()
  {
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
materials: new FormControl('', [
Validators.required,
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
  
  async submit () 
  {
    var datetime = await moment(new Date()).format("MM-DD-YYYY hh:mm A")
    var validation = Object.assign(this.validation())


    //if the reactive form is still invalid
    if (validation.isValid === false) 
    {
      var errorAlert = await this.alertCtrl.create({
        header: "This fields shouldn't be empty and must be in the correct format",
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
    //if the reactive form is now valid 
    else 
    { 
      this.modal.present();
      this.setMaterials()
    }   
  }

   validation() 
  {
    var firstnamevalidationiserror =  this.registerForm.controls.firstname.invalid    
    var descriptionvalidationiserror =  this.registerForm.controls.description.invalid
    //var gramsnonhandvalidationiserror =  this.registerForm.controls.gramsonhand.invalid
    //var gramsperodervalidationiserror =  this.registerForm.controls.gramsperorder.invalid
    var unitpricevalidationiserror =  this.registerForm.controls.unitprice.invalid
    var smallpricevalidationiserror =  this.registerForm.controls.smallprice.invalid
    var mediumpricevalidationiserror =  this.registerForm.controls.mediumprice.invalid
    var gramsperodersmallvalidationiserror =  this.registerForm.controls.gramsperodersmall.invalid
    var gramsperodermediumvalidationiserror =  this.registerForm.controls.gramsperodermedium.invalid
    var materialvalidationiserror = this.registerForm.controls.materials.invalid

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
         descriptionvalidationiserror === true 
        ||  smallpricevalidationiserror === true
        || mediumpricevalidationiserror === true || materialvalidationiserror)
        {
          this.errMsg = ''
          this.isValid = false
          //this.errMsg +=  firstnamevalidationiserror === true ? "• Name<br>" : ""
          this.errMsg += descriptionvalidationiserror === true ? "• Description<br>" : ""
          //this.errMsg += gramsnonhandvalidationiserror === true ? "• Grams on hand<br>" : ""
          this.errMsg += smallpricevalidationiserror === true ? "• Small unit price<br>" : ""
          this.errMsg +=  mediumpricevalidationiserror === true ? "• Medium unit price<br>": ""
          this.errMsg +=  materialvalidationiserror === true ? "• Materials<br>": ""
          //this.errMsg +=  gramsperodersmallvalidationiserror === true ? "• Grams per order small<br>": ""
          //this.errMsg +=  gramsperodermediumvalidationiserror === true ? "• Grams per order medium<br>": ""
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
        descriptionvalidationiserror  === true  || unitpricevalidationiserror === true
        || materialvalidationiserror)
        {
          this.errMsg = ''
          this.isValid =  false
          //this.errMsg +=  firstnamevalidationiserror === true ? "• Name<br>" : ""
          this.errMsg += descriptionvalidationiserror === true ? "• Description<br>" : ""
          this.errMsg += unitpricevalidationiserror === true ? "• Unit price<br>" : ""
          this.errMsg += materialvalidationiserror === true ? "• Materials<br>" : ""
          //this.errMsg += gramsperodervalidationiserror === true ? "• Grams per order<br>" : ""
      
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
  close() {
    this.modal.dismiss()  
}
 savechanges()
{ 
  this.productReference.update({
        Description: this.registerForm.value.description,
        Stock: 0,
        GramsPerOrder: 0,
        UnitPrice: this.category != "Milktea" ? this.registerForm.value.unitprice.toString() : "0",
        SmallPrice: this.category == "Milktea" ? this.registerForm.value.smallprice.toString() : "0",
        MediumPrice: this.category == "Milktea" ? this.registerForm.value.mediumprice : "0",
        ImageUrl: this.photoLink,
        Materials: this.arrayForMaterial
      }).then(async (success) => 
      {
        var alertSuccess = await this.alertCtrl.create({
          message: 'Product updated successfully!',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            },
          ],
        });
  
        await alertSuccess.present()
      }).catch(async (err) => 
      {
        var alertErr = await this.alertCtrl.create({
          message: JSON.stringify(err),
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            },
          ],
        });
  
        await alertErr.present()
      })
}
updateGramsPerOrderEvent(event, mat)
{
  mat.gramsperorder = parseInt(event.target.value)
  //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
  //mat.gramsperordersmall = this.category != 'Milktea' ? 0 : parseInt(event.target.value) 
}
updateGramsPerOrderSmallEvent(event, mat)
{
  //mat.gramsperorder = this.category != 'Milktea' ? parseInt(event.target.value) : 0
  //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
  mat.gramsperordersmall = parseInt(event.target.value) 
}
updateGramsPerOrderMediumEvent(event, mat)
{
  //mat.gramsperorder = this.category != 'Milktea' ? parseInt(event.target.value) : 0
  //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
  mat.gramsperordermedium = parseInt(event.target.value) 
}
}
