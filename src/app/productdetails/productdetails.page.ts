import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
productDocument: AngularFirestoreDocument
sub
id;
imageUrl
category
productname
unitprice
  constructor(private afstore: AngularFirestore, private actRoute: ActivatedRoute) { 
this.id = this.actRoute.snapshot.paramMap.get('id')

this.productDocument = this.afstore.collection('Products').doc(this.id)

this.sub = this.productDocument.valueChanges().subscribe(data => {
this.imageUrl = data.ImageUrl
this.category = data.Category
this.productname = data.ProductName
this.unitprice = data.UnitPrice
})

  }

  ngOnInit() {
  }

}
