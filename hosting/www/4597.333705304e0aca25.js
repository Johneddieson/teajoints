"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4597],{64597:(S,h,a)=>{a.r(h),a.d(h,{ViewproductsPageModule:()=>A});var u=a(69808),g=a(34182),r=a(54153),d=a(41115),m=a(70655),t=a(6435),P=a(24850),f=a(40520),M=a(5920),x=a(72316);const y=["productbtn"];function b(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"ion-content",7)(1,"ion-item")(2,"ion-label"),t._uU(3,"Product Category :"),t.qZA(),t.TgZ(4,"ion-input",8),t.NdJ("ngModelChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.productCategory=i)})("ionChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.handleChangeSearch(i))}),t.qZA()(),t.TgZ(5,"ion-item")(6,"ion-label"),t._uU(7,"Product Name :"),t.qZA(),t.TgZ(8,"ion-input",8),t.NdJ("ngModelChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.productName=i)})("ionChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.handleChangeSearch(i))}),t.qZA()(),t.TgZ(9,"ion-item",9)(10,"ion-label"),t._uU(11,"Product Grams On Hand :"),t.qZA(),t.TgZ(12,"ion-input",8),t.NdJ("ngModelChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.productOnHand=i)})("ionChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.handleChangeSearch(i))}),t.qZA()(),t.TgZ(13,"ion-item",10)(14,"ion-buttons",2)(15,"ion-button",11),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.close())}),t._uU(16,"Close"),t.qZA()()()()}if(2&o){const e=t.oxw();t.xp6(4),t.Q6J("ngModel",e.productCategory),t.xp6(4),t.Q6J("ngModel",e.productName),t.xp6(4),t.Q6J("ngModel",e.productOnHand)}}function w(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"p")(1,"small"),t._uU(2),t.ALo(3,"currency"),t.qZA(),t._UZ(4,"br"),t.TgZ(5,"a",17),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit,c=t.oxw();return t.KtG(c.DeleteProduct(i))}),t._uU(6,"Remove"),t.qZA()()}if(2&o){const e=t.oxw().$implicit;t.xp6(2),t.hij("Price: ",t.xi3(3,1,e.UnitPrice,"\u20b1"),"")}}function O(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"p")(1,"small"),t._uU(2),t.ALo(3,"currency"),t.qZA(),t._UZ(4,"br"),t.TgZ(5,"small"),t._uU(6),t.ALo(7,"currency"),t.qZA(),t._UZ(8,"br"),t.TgZ(9,"a",17),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit,c=t.oxw();return t.KtG(c.DeleteProduct(i))}),t._uU(10,"Remove"),t.qZA()()}if(2&o){const e=t.oxw().$implicit;t.xp6(2),t.hij("SmallPrice: ",t.xi3(3,2,e.SmallPrice,"\u20b1"),""),t.xp6(4),t.hij("MediumPrice: ",t.xi3(7,5,e.MediumPrice,"\u20b1"),"")}}function Z(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"tr")(1,"td")(2,"div",12),t._UZ(3,"img",13),t.TgZ(4,"div")(5,"h3"),t._uU(6),t.qZA(),t.YNc(7,w,7,4,"p",14),t.YNc(8,O,11,8,"p",14),t.qZA()()(),t.TgZ(9,"td")(10,"span",15)(11,"button",16),t.NdJ("click",function(){const c=t.CHM(e).$implicit,s=t.oxw();return t.KtG(s.EditProduct(c))}),t._uU(12," Edit"),t.qZA()()()()}if(2&o){const e=l.$implicit;t.xp6(3),t.s9C("src",e.ImageUrl,t.LSH),t.xp6(3),t.AsE("",e.ProductName," (",e.Category,")"),t.xp6(1),t.Q6J("ngIf","Milktea"!=e.Category),t.xp6(1),t.Q6J("ngIf","Milktea"==e.Category)}}const v=[{path:"",component:(()=>{class o{constructor(e,n,i,c,s,p,_){this.http=e,this.loadingCtrl=n,this.alertCtrl=i,this.afstore=c,this.afauth=s,this.router=p,this.actRoute=_,this.products=[],this.dropdown=!1,this.category="",this.productCategory="",this.productName="",this.productOnHand="",this.afauth.authState.subscribe(C=>{C&&C.uid&&this.getAllProducts()})}getAllProducts(){this.productReference=this.afstore.collection("Products"),this.sub=this.productReference.snapshotChanges().pipe((0,P.U)(e=>e.map(n=>Object.assign({id:n.payload.doc.id},n.payload.doc.data())))).subscribe(e=>{e=e.sort(function(n,i){return n.ProductName<i.ProductName?-1:n.ProductName>i.ProductName?1:0}),this.products=e,""!=this.productCategory&&(e=e.filter(n=>n.Category.toLowerCase().includes(this.productCategory.toLowerCase()))),""!=this.productName&&(e=e.filter(n=>n.ProductName.toLowerCase().includes(this.productName.toLowerCase()))),""!=this.productOnHand&&(e=e.filter(n=>n.Stock.toString()==this.productOnHand)),this.products=e})}loadProducts(){return(0,m.__awaiter)(this,void 0,void 0,function*(){var e=yield this.loadingCtrl.create({message:"Loading...",spinner:"bubbles"});yield e.present(),setTimeout(()=>{e.dismiss()},300)})}SearchCategory(){return(0,m.__awaiter)(this,void 0,void 0,function*(){var e=this.alertCtrl.create({header:"Choose Category",inputs:[{type:"radio",label:"--SHOW ALL--",value:""},{type:"radio",label:"Frappe",value:"Frappe"},{type:"radio",label:"Milktea",value:"Milktea"},{type:"radio",label:"Noodles",value:"Noodles"},{type:"radio",label:"Pares",value:"Pares"},{type:"radio",label:"Platters",value:"Platters"},{type:"radio",label:"Shakes",value:"Shakes"},{type:"radio",label:"Silog Meals",value:"Silog Meals"},{type:"radio",label:"Sizzling Meal W Rice",value:"Sizzling Meal W/ Rice"},{type:"radio",label:"Snacks",value:"Snacks"},{type:"radio",label:"Rice Meal",value:"Rice Meal"}],buttons:[{text:"Search",handler:n=>{this.category=n,this.loadProducts(),setTimeout(()=>{this.getAllProducts()},500)}},{text:"Close",role:"cancel"}]});(yield e).present()})}ngOnInit(){}DeleteProduct(e){this.alertCtrl.create({message:"Are you sure you want to delete this product?",buttons:[{text:"Yes",handler:()=>{this.afstore.doc(`Products/${e.id}`).delete()}},{text:"No",role:"cancel"}]}).then(n=>{n.present()})}EditProduct(e){this.router.navigateByUrl(`/editproduct/${e.id}`)}hideDropdown(e){const n=e.clientX,i=e.clientY,c=this.productbtn.nativeElement.getBoundingClientRect();(n<c.left+2||n>c.right-2||i<c.top+2)&&(this.dropdown=!1)}close(){this.modal.dismiss()}handleChangeSearch(e){this.getAllProducts()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(f.eN),t.Y36(r.HT),t.Y36(r.Br),t.Y36(M.ST),t.Y36(x.zQ),t.Y36(d.F0),t.Y36(d.gz))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-viewproducts"]],viewQuery:function(e,n){if(1&e&&(t.Gf(y,5,t.SBq),t.Gf(r.ki,5)),2&e){let i;t.iGM(i=t.CRH())&&(n.productbtn=i.first),t.iGM(i=t.CRH())&&(n.modal=i.first)}},inputs:{title:"title"},decls:17,vars:2,consts:[["slot","start"],["menu","main-menu"],["slot","end"],["name","search-outline","id","open-modalsearching",2,"cursor","pointer","zoom","2.0"],["trigger","open-modalsearching","mode","sm",1,"example-modal",3,"backdropDismiss"],[1,"small-container","cart-page"],[4,"ngFor","ngForOf"],["id","modal-content"],[3,"ngModel","ngModelChange","ionChange"],["counter","true"],["lines","none"],["color","danger",3,"click"],[1,"cart-info"],[3,"src"],[4,"ngIf"],[2,"float","right"],["id","btn",3,"click"],[3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"ion-toolbar")(1,"ion-buttons",0),t._UZ(2,"ion-menu-button",1),t.TgZ(3,"ion-title"),t._uU(4,"View Products"),t.qZA()(),t.TgZ(5,"ion-buttons",2),t._UZ(6,"ion-icon",3),t.qZA()(),t.TgZ(7,"ion-content")(8,"ion-modal",4),t.YNc(9,b,17,3,"ng-template"),t.qZA(),t.TgZ(10,"div",5)(11,"table")(12,"tr")(13,"th"),t._uU(14,"Product Name"),t.qZA(),t._UZ(15,"th"),t.qZA(),t.YNc(16,Z,13,5,"tr",6),t.qZA()()()),2&e&&(t.xp6(8),t.Q6J("backdropDismiss",!1),t.xp6(8),t.Q6J("ngForOf",n.products))},dependencies:[u.sg,u.O5,g.JJ,g.On,r.YG,r.Sm,r.W2,r.gu,r.pK,r.Ie,r.Q$,r.fG,r.wd,r.sr,r.ki,r.j9,u.H9],styles:["ion-back-button[_ngcontent-%COMP%]{display:block}ion-content[_ngcontent-%COMP%]{--background: #6d6875}ion-content[_ngcontent-%COMP%]   #btn[_ngcontent-%COMP%]{padding:10px 20px;color:#fff;background-color:#ffb4a2}ion-content[_ngcontent-%COMP%]   #btn[_ngcontent-%COMP%]:active{background-color:#051542}ion-content[_ngcontent-%COMP%]   .cart-page[_ngcontent-%COMP%]{margin:16px auto;border:12vmax}ion-content[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse}ion-content[_ngcontent-%COMP%]   .cart-info[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}ion-content[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-align:left;padding:5px;color:#fff;background:#e5989b;font-weight:400}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px 5px}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:70px;height:30px;padding:5px}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#ff523b;font-size:14px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;cursor:pointer}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;height:80px;margin-right:10px}ion-content[_ngcontent-%COMP%]   .total-price[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}ion-content[_ngcontent-%COMP%]   .total-price[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{border-top:3px solid #ff523b;width:100%;max-width:370px}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child{text-align:right}ion-content[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child{text-align:right}.example-modal[_ngcontent-%COMP%]{align-items:center;justify-content:center}.example-modal[_ngcontent-%COMP%]::part(content){width:80%;height:50%}ion-toolbar[_ngcontent-%COMP%]{--background: #e5989b}"]}),o})()}];let T=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[d.Bz.forChild(v),d.Bz]}),o})(),A=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[u.ez,g.u5,r.Pc,T]}),o})()}}]);