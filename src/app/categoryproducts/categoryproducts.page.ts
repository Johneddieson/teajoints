import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoryproducts',
  templateUrl: './categoryproducts.page.html',
  styleUrls: ['./categoryproducts.page.scss'],
})
export class CategoryproductsPage implements OnInit {
productByCategory: AngularFirestoreCollection;
sub;
products: any[] = []
categoryName: string = ''
  constructor(private afauth: AngularFireAuth,
    private afstore: AngularFirestore,
    private actRoute: ActivatedRoute) 
    {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid)
      {
       var query = this.actRoute.snapshot.paramMap.get('name')
        this.categoryName = query.toUpperCase()
       this.productByCategory = this.afstore.collection('Products', ref => ref.where('Category', '==', query))
          this.sub = this.productByCategory.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          })))
          .subscribe(async data => 
            {
                console.log("the data", data)
                this.products = data
              })  
      }
    })
     }

  ngOnInit() {
  }

}
