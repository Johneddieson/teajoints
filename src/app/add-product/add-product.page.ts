import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, IonInput, IonModal, LoadingController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import * as moment from 'moment';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  registerForm: FormGroup;
  photoLink: any;
  withPhoto: boolean = false;
  hideSizeDropdown: boolean = false;
  hideFlavorsDropdown: boolean = false;
  public isValid: boolean = false
  public errMsg: string = ''
  public validationMessageObject: object = {}
  public productCollectionReference: AngularFirestoreCollection
  public sub;
  public materialArray : any[] = []
  materialEachElementReference: AngularFirestoreDocument

  materialReference: AngularFirestoreCollection
 sub2
 public arrayForMaterial = []
 existingMaterials = [];
 public disableSaveChangesButton: boolean = true
@ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonInput) myInputVariable: IonInput;
  constructor(
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private afstore: AngularFirestore
  ) 
  {
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

      close() {
        this.modal.dismiss()  
    }
     


      updateGramsPerOrderEvent(event, mat)
      {
        mat.gramsperorder = parseInt(event.target.value)
        this.validationForGramsPerOrder()
        //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
        //mat.gramsperordersmall = this.category != 'Milktea' ? 0 : parseInt(event.target.value) 
      }
      updateGramsPerOrderSmallEvent(event, mat)
      {
        //mat.gramsperorder = this.category != 'Milktea' ? parseInt(event.target.value) : 0
        //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
        mat.gramsperordersmall = parseInt(event.target.value)
        this.validationForGramsPerOrder() 
      }
      updateGramsPerOrderMediumEvent(event, mat)
      {
        //mat.gramsperorder = this.category != 'Milktea' ? parseInt(event.target.value) : 0
        //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
        mat.gramsperordermedium = parseInt(event.target.value) 
        this.validationForGramsPerOrder()
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
              gramsperordersmall : parseInt("0"),
              gramsperordermedium : parseInt("0"),
              gramsperorder :  parseInt("0"),   
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
  ngOnInit() {
    this.photoLink =
      'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308';
    this.registerForm = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/,
          msg: 'Always Starts With Capital Letter',
        }),
        this.customPatternValid({
          pattern: /^([^0-9]*)$/,
          msg: 'Number is not allowed',
        }),
        Validators.minLength(5),
       
      ]),
      
      firstname: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/,
          msg: 'Always Starts With Capital Letter',
        }),
        this.customPatternValid({
          pattern: /^([^0-9]*)$/,
          msg: 'Number is not allowed',
        }),
        Validators.minLength(4),
        // Validators.maxLength(10),
      ]),
      description: new FormControl('', [
        Validators.required,
        // this.customPatternValid({
        //   pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/,
        //   msg: 'Always Starts With Capital Letter',
        // }),
        //Validators.minLength(50),
         Validators.minLength(10),
      ]),

      gramsnonhand: new FormControl('', [
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
      gramsperoder: new FormControl('', [
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
      unitprice: new FormControl('', [
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
    });
  }
  customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) {
        return {
          invalidMsg: config.msg,
        };
      } else {
        return null;
      }
    };
  }
  reset() {
    console.log('wew', this.myInputVariable.value);

    this.myInputVariable.value = '';
  }
  fileChanged(event) {
    const files = event.target.files;
    console.log('the files', files);
    const data = new FormData();
    data.append('file', files[0]);
    //pukikinginamo@gmail.com account
    data.append('UPLOADCARE_PUB_KEY', 'd215c12fb1b590263b07');
    this.http
      .post('https://upload.uploadcare.com/base/', data)
      .subscribe((events: any) => {
        var json = { events };
        for (var prop in json) {
          //console.log('wew', json[prop].file);
          for (const variables of files) {
            this.photoLink = `https://ucarecdn.com/${json[prop].file}/${variables.name}`;
          }
        }
        this.withPhoto = true;
      });
  }
 
  handleChange(event) {
    const category = event.target.value.toLowerCase();
    if (category.toLowerCase() == 'milktea') {
      this.hideSizeDropdown = true;
      this.registerForm.controls['mediumprice'].setValue('');
      this.registerForm.controls['smallprice'].setValue('');
      this.registerForm.controls['unitprice'].setValue('');
      this.registerForm.controls['gramsperodersmall'].setValue('');
      this.registerForm.controls['gramsperodermedium'].setValue('');
      this.registerForm.controls['gramsperoder'].setValue('');
    } else {
      this.hideSizeDropdown = false;
      // this.registerForm.controls['mediumprice'].setValue('');
      // this.registerForm.controls['smallprice'].setValue('');
      // this.registerForm.controls['unitprice'].setValue('');
    }
    
  }

  async submit() {
    var isvalid =  Object.assign(this.validation()) 
        if (isvalid.isValid == false) 
        {
           var alertNotValid = await this.alertCtrl.create({
            header: 'This fields must be in the correct format',
            message: `<b>${isvalid.errMessage}</b>`,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
           })
           await alertNotValid.present() 
        }
        else 
        {
          if (this.withPhoto == false) {
            var alert = await this.alertCtrl.create({
              message: 'Please Add a Photo',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                },
              ],
            });
      
            alert.present();
          }
          else 
          {
            this.productCollectionReference = this.afstore.collection('Products')
            
          this.sub = this.productCollectionReference.get()
          .pipe(map(actions => {
            var tempdoc = actions.docs.map((doc) => {
              return {id: doc.id, ...doc.data() as any}
            })
            return tempdoc
          }))
          .subscribe(async data => {
            var existing = data.filter(f => f.Category.toLowerCase().replace(/\s+/g, '') == this.registerForm.value.category.toLowerCase().replace(/\s+/g, '') && f.ProductName.toLowerCase().replace(/\s+/g, '') == this.registerForm.value.firstname.toLowerCase().replace(/\s+/g, ''))

              if (existing.length > 0) 
              {
                  var alertExisting = await this.alertCtrl.create({
                    message: `${this.registerForm.value.firstname} in the ${this.registerForm.value.category} category 
                    already exist.`
                  })
                  await alertExisting.present();
                }
              else 
              {
                
              
                this.showMaterialsModal()     
              }
          })
          }
        }
  }

  showMaterialsModal()
  {
    this.setMaterials();
    this.modal.present()
  }
  async savechanges()
  {
    //console.log("Array for material", this.arrayForMaterial)
    
                 await this.saveFunction()
  }
  async saveFunction() 
  {
var loading = await this.loadingCtrl.create
({
  message: 'Creating product...',
  spinner: 'circles'
})
await loading.present();

    var datetime = await moment(new Date()).format("MM-DD-YYYY hh:mm A")
             
      this.afstore.collection('Products').add({
              Category: this.registerForm.value.category,
              ProductName: this.registerForm.value.firstname,
              Stock: 0,
              UnitPrice: this.registerForm.value.category != "Milktea" ? this.registerForm.value.unitprice : "0",
              ImageUrl: this.photoLink,
              Quantity: 1,
              GramsPerOrder: 0,
              Description: this.registerForm.value.description,
              SmallPrice: this.registerForm.value.category == "Milktea" ? this.registerForm.value.smallprice : "0",
              MediumPrice:  this.registerForm.value.category == "Milktea" ? this.registerForm.value.mediumprice : "0",
              GramsPerOderSmall: 0,
              GramsPerOderMedium: 0,
              Materials: this.arrayForMaterial
            }).then(async (success) => 
            {
              await loading.dismiss();
              await this.modal.dismiss();
    var alertValid = await this.alertCtrl.create({
      message: 'Product added successfully!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    })
    await alertValid.present()
    await this.registerForm.reset()
    this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'  
  }).catch((err) => 
  {
    alert(JSON.stringify(err))
  })

          //  await this.afstore.collection('Inventory').add({
          //   Datetime: datetime,
          //   Category: this.registerForm.value.category,
          //   ProductName: this.registerForm.value.firstname,
          //   Quantity: parseInt(this.registerForm.value.gramsnonhand),
          //   UnitPrice: this.registerForm.value.category != "Milktea" ? this.registerForm.value.unitprice : "0",
          //   ImageUrl: this.photoLink,
          //   GramsPerOrder: this.registerForm.value.category != "Milktea" ? parseInt(this.registerForm.value.gramsperoder) : 0,
          //   Description: this.registerForm.value.description,
          //   SmallPrice: this.registerForm.value.category == "Milktea" ? this.registerForm.value.smallprice : "0",
          //   MediumPrice:  this.registerForm.value.category == "Milktea" ? this.registerForm.value.mediumprice : "0",
          //   DatetimeToSort: new Date(),
          //   ProductId: saving.id,
          //   GramsPerOderSmall: this.registerForm.value.category == "Milktea" ? parseInt(this.registerForm.value.gramsperodersmall) : 0,
          //   GramsPerOderMedium: this.registerForm.value.category == "Milktea" ? parseInt(this.registerForm.value.gramsperodermedium) : 0,
          // })           
          
  }
   validation() 
  {
    var categoryvalidationiserror =  this.registerForm.controls.category.invalid
    var firstnamevalidationiserror =  this.registerForm.controls.firstname.invalid
    var descriptionvalidationiserror =  this.registerForm.controls.description.invalid
    //var gramsnonhandvalidationiserror =  this.registerForm.controls.gramsnonhand.invalid
    //var gramsperodervalidationiserror =  this.registerForm.controls.gramsperoder.invalid
    var unitpricevalidationiserror =  this.registerForm.controls.unitprice.invalid
    var smallpricevalidationiserror =  this.registerForm.controls.smallprice.invalid
    var mediumpricevalidationiserror =  this.registerForm.controls.mediumprice.invalid
    var materialvalidationiserror = this.registerForm.controls.materials.invalid
    //var gramsperodersmallvalidationiserror =  this.registerForm.controls.gramsperodersmall.invalid
    //var gramsperodermediumvalidationiserror =  this.registerForm.controls.gramsperodermedium.invalid
    // console.log("categoryvalidationiserror", categoryvalidationiserror)
    // console.log("firstnamevalidationiserror", firstnamevalidationiserror)
    // console.log("descriptionvalidationiserror", descriptionvalidationiserror)
    // console.log("gramsnonhandvalidationiserror", gramsnonhandvalidationiserror)
    // console.log("gramsperodervalidationiserror", gramsperodervalidationiserror)
    // console.log("unitpricevalidationiserror", unitpricevalidationiserror)
    // console.log("smallpricevalidationiserror", smallpricevalidationiserror)
    // console.log("mediumpricevalidationiserror", mediumpricevalidationiserror)
    
    if (this.registerForm.value.category == "Milktea")
    {
      if (categoryvalidationiserror === true || firstnamevalidationiserror === true
        || descriptionvalidationiserror === true 
        ||  smallpricevalidationiserror === true
        || mediumpricevalidationiserror === true
        || materialvalidationiserror === true)
        {
          this.errMsg = ''
          this.isValid = false
          this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
          this.errMsg +=  firstnamevalidationiserror === true ? "• Name<br>" : ""
          this.errMsg += descriptionvalidationiserror === true ? "• Description<br>" : ""
          //this.errMsg += gramsperodervalidationiserror === true ? "• Grams per order<br>" : ""
          this.errMsg += smallpricevalidationiserror === true ? "• Small unit price<br>" : ""
          this.errMsg +=  mediumpricevalidationiserror === true ? "• Medium unit price<br>": ""
          this.errMsg += materialvalidationiserror === true ? "• Materials<br>" : ""
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
      if (categoryvalidationiserror === true || firstnamevalidationiserror === true
        || descriptionvalidationiserror  === true ||  unitpricevalidationiserror === true
        || materialvalidationiserror === true)
        {
          this.errMsg = ''
          this.isValid =  false
          this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
          this.errMsg +=  firstnamevalidationiserror === true ? "• Name<br>" : ""
          this.errMsg += descriptionvalidationiserror === true ? "• Description<br>" : ""
          this.errMsg += unitpricevalidationiserror === true ? "• Unit price<br>" : ""
          this.errMsg += materialvalidationiserror === true ? "• Materials<br>" : ""
          //this.errMsg += gramsnonhandvalidationiserror === true ? "• Grams on hand<br>" : ""
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
  validationForGramsPerOrder()
  {
    var filterNanValues;
  
      if (this.registerForm.value.category != 'Milktea')
      {
        filterNanValues = this.arrayForMaterial.filter(f => (isNaN(f.gramsperorder) || f.gramsperorder == 0) 
        || (isNaN(f.gramsperordersmall) && f.gramsperordersmall == 0)  || 
        (isNaN(f.gramsperordermedium) && f.gramsperordermedium == 0)
        )
      }
      else 
      {
        filterNanValues = this.arrayForMaterial.filter(f => (isNaN(f.gramsperorder) && f.gramsperorder == 0) 
        || (isNaN(f.gramsperordersmall) || f.gramsperordersmall == 0)  || 
        (isNaN(f.gramsperordermedium) || f.gramsperordermedium == 0)
        )
      }
      
      var showCondimentsWithNaNValues = filterNanValues.map(function(e) {return `${e.itemName.replace(",", "")} \n`}).toString()
      showCondimentsWithNaNValues = showCondimentsWithNaNValues.replace(",", "")
      if (filterNanValues.length >= 1)
      {
        this.disableSaveChangesButton = true
      }
      else 
      {
        //console.log("success")
        //alert("success")
        this.disableSaveChangesButton = false
      } 
  }
}
