"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1635],{31635:(q,M,a)=>{a.r(M),a.d(M,{CreateposPageModule:()=>$});var k=a(81609),f=a(69808),N=a(34182),g=a(54153),v=a(41115),p=a(70655),t=a(6435),Z=a(8929),T=a(24850),I=a(11423),A=a(33388),Q=a(5920),U=a(72316);const w=["productbtn"];function J(r,l){if(1&r&&(t.TgZ(0,"ion-badge",13),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.Oqu(e.numbers)}}function F(r,l){1&r&&(t.TgZ(0,"span"),t._uU(1,"Flavors"),t.qZA())}function j(r,l){if(1&r&&(t.TgZ(0,"div")(1,"span",18),t._uU(2),t.ALo(3,"currency"),t.qZA(),t._UZ(4,"br"),t.TgZ(5,"span",18),t._uU(6),t.qZA(),t._UZ(7,"br"),t.YNc(8,F,2,0,"span",17),t.qZA()),2&r){const e=t.oxw().$implicit,i=t.oxw();t.xp6(2),t.Oqu(t.xi3(3,3,e.UnitPrice,"\u20b1")),t.xp6(4),t.hij("",i.parseToFloat(e.Stock/e.GramsPerOrder)," remaining"),t.xp6(2),t.Q6J("ngIf","Fries"==e.ProductName||"Chicken Fingers"==e.ProductName)}}function B(r,l){if(1&r&&(t.TgZ(0,"div")(1,"span",18),t._uU(2),t.ALo(3,"currency"),t.qZA(),t._UZ(4,"br"),t.TgZ(5,"span",18),t._uU(6),t.ALo(7,"currency"),t.qZA(),t._UZ(8,"br"),t.TgZ(9,"span",18),t._uU(10),t.qZA(),t._UZ(11,"br"),t.TgZ(12,"span",18),t._uU(13),t.qZA()()),2&r){const e=t.oxw().$implicit,i=t.oxw();t.xp6(2),t.hij("Small : ",t.xi3(3,4,e.SmallPrice,"\u20b1"),""),t.xp6(4),t.hij("Medium : ",t.xi3(7,7,e.MediumPrice,"\u20b1"),""),t.xp6(4),t.hij("",i.parseToFloat(e.Stock/e.GramsPerOderSmall)," remaining (Small)"),t.xp6(3),t.hij("",i.parseToFloat(e.Stock/e.GramsPerOderMedium)," remaining (Medium)")}}function G(r,l){if(1&r){const e=t.EpF();t.TgZ(0,"div",14),t._UZ(1,"img",15),t.TgZ(2,"h2",16),t._uU(3),t.qZA(),t.YNc(4,j,9,6,"div",17),t.YNc(5,B,14,10,"div",17),t.TgZ(6,"span",18)(7,"h5")(8,"span",19),t.NdJ("click",function(){const s=t.CHM(e).$implicit,u=t.oxw();return t.KtG(u.Decrease(s))}),t._uU(9," - "),t.qZA(),t._uU(10),t.TgZ(11,"span",20),t.NdJ("click",function(){const s=t.CHM(e).$implicit,u=t.oxw();return t.KtG(u.Increase(s))}),t._uU(12," + "),t.qZA()()(),t.TgZ(13,"i",11),t.NdJ("click",function(){const s=t.CHM(e).$implicit,u=t.oxw();return t.KtG(u.AddtoCart(s))}),t._UZ(14,"ion-icon",21),t.qZA()()}if(2&r){const e=l.$implicit;t.xp6(1),t.s9C("src",e.ImageUrl,t.LSH),t.xp6(2),t.Oqu(e.ProductName),t.xp6(1),t.Q6J("ngIf","Milktea"!=e.Category),t.xp6(1),t.Q6J("ngIf","Milktea"==e.Category),t.xp6(5),t.Oqu(e.Quantity)}}const Y=[{path:"",component:(()=>{class r{constructor(e,i,n,s,u,h,y,x,P,c,o,m){this.msg=e,this.alertCtrl=i,this.auth=n,this.afstore=s,this.afauth=u,this.locationStrategy=h,this.router=y,this.applicationRef=x,this.zone=P,this.actRoute=c,this.loadingCtrl=o,this.admincheckout=m,this.numbers=0,this.showLog=!1,this.productList=[],this.getCartDetails=[],this.cartItem=0,this.dropdown=!1,this.category="",this.unsubscriber=new Z.xQ,this.itemsCart=[],this.afauth.authState.subscribe(C=>{C&&C.uid&&this.getAllProducts()})}getAllProducts(){this.productReference=this.category?this.afstore.collection("Products",e=>e.where("Category","==",this.category)):this.afstore.collection("Products"),this.sub=this.productReference.snapshotChanges().pipe((0,T.U)(e=>e.map(i=>Object.assign({id:i.payload.doc.id},i.payload.doc.data())))).subscribe(e=>{e=e.sort(function(i,n){return i.ProductName<n.ProductName?-1:i.ProductName>n.ProductName?1:0}),this.productList=e})}loadProducts(){return(0,p.__awaiter)(this,void 0,void 0,function*(){var e=yield this.loadingCtrl.create({message:"Loading...",spinner:"bubbles"});yield e.present(),setTimeout(()=>{e.dismiss()},300)})}ngOnInit(){setInterval(()=>{this.loadCart()},200)}SearchCategory(){return(0,p.__awaiter)(this,void 0,void 0,function*(){var e=this.alertCtrl.create({header:"Choose Category",inputs:[{type:"radio",label:"--SHOW ALL--",value:""},{type:"radio",label:"Frappe",value:"Frappe"},{type:"radio",label:"Milktea",value:"Milktea"},{type:"radio",label:"Noodles",value:"Noodles"},{type:"radio",label:"Pares",value:"Pares"},{type:"radio",label:"Platters",value:"Platters"},{type:"radio",label:"Shakes",value:"Shakes"},{type:"radio",label:"Silog Meals",value:"Silog Meals"},{type:"radio",label:"Sizzling Meal W Rice",value:"Sizzling Meal With Rice"},{type:"radio",label:"Snacks",value:"Snacks"},{type:"radio",label:"Rice Meal",value:"Rice Meal"}],buttons:[{text:"Search",handler:i=>{this.category=i,this.loadProducts(),setTimeout(()=>{this.getAllProducts()},500)}},{text:"Close",role:"cancel"}]});(yield e).present()})}loadCart(){if(null!=sessionStorage.getItem("cart")){var e=[];e.push(JSON.parse(sessionStorage.getItem("cart"))),this.numbers=e[0].length}else this.numbers=0}Increase(e){e.Quantity+=1,this.loadCart()}Decrease(e){1==e.Quantity?this.alertCtrl.create({message:"Quantity should not be zero",buttons:[{text:"Ok",role:"cancel"}]}).then(i=>{i.present(),this.loadCart()}):(e.Quantity-=1,this.loadCart())}cartItemFunc(){var e=JSON.parse(sessionStorage.getItem("cart"));this.cartItem=e.length,this.msg.cartSubject.next(this.cartItem)}checkout(){this.router.navigateByUrl("/admincheckout")}hideDropdown(e){const i=e.clientX,n=e.clientY,s=this.productbtn.nativeElement.getBoundingClientRect();(i<s.left+2||i>s.right-2||n<s.top+2)&&(this.dropdown=!1)}AddtoCart(e){return(0,p.__awaiter)(this,void 0,void 0,function*(){var i=sessionStorage.getItem("cart");let n=[];if(null==i)if("Milktea"==e.Category){var s=yield this.alertCtrl.create({header:"Please choose a size",inputs:[{type:"radio",label:"Small",value:"Small"},{type:"radio",label:"Medium",value:"Medium"}],buttons:[{text:"Go",handler:c=>(0,p.__awaiter)(this,void 0,void 0,function*(){if(null==c||null==c||""==c){var o=yield this.alertCtrl.create({message:"No size selected",buttons:[{text:"Ok",role:"cancel"}]});yield o.present()}else{var m=this.AddtoCartObject(e,c,"");n.push(m),sessionStorage.setItem("cart",JSON.stringify(n)),e.Quantity=1,this.msg.cartSubject.next(this.admincheckout.ngOnInit())}})},{text:"Close",role:"cancel"}]});yield s.present()}else if("Snacks"!=e.Category||"Fries"!=e.ProductName&&"Chicken Fingers"!=e.ProductName){var h=this.AddtoCartObject(e,"","");n.push(h),sessionStorage.setItem("cart",JSON.stringify(n)),e.Quantity=1}else{var u=yield this.alertCtrl.create({header:"Please select a flavor",inputs:[{type:"radio",label:"Cheese",value:"Cheese"},{type:"radio",label:"Sour Cream",value:"Sour Cream"},{type:"radio",label:"Bbq",value:"Bbq"}],buttons:[{text:"Go",handler:c=>(0,p.__awaiter)(this,void 0,void 0,function*(){if(null==c||null==c||""==c){var o=yield this.alertCtrl.create({message:"No flavor selected",buttons:[{text:"Ok",role:"cancel"}]});yield o.present()}else{var m=this.AddtoCartObject(e,"",c);n.push(m),sessionStorage.setItem("cart",JSON.stringify(n)),e.Quantity=1,this.msg.cartSubject.next(this.admincheckout.ngOnInit())}})},{text:"Close",role:"cancel"}]});yield u.present()}else if("Milktea"==e.Category)s=yield this.alertCtrl.create({header:"Please choose a size",inputs:[{type:"radio",label:"Small",value:"Small"},{type:"radio",label:"Medium",value:"Medium"}],buttons:[{text:"Go",handler:o=>(0,p.__awaiter)(this,void 0,void 0,function*(){if(null==o||null==o||""==o){var m=yield this.alertCtrl.create({message:"No size selected",buttons:[{text:"Ok",role:"cancel"}]});yield m.present()}else{var C=e.id;let b=-1;this.itemsCart=JSON.parse(sessionStorage.getItem("cart"));for(let d=0;d<this.itemsCart.length;d++)if(C==this.itemsCart[d].id&&this.itemsCart[d].ProductName==`${e.ProductName} ${o}`){this.itemsCart[d].Quantity=e.Quantity,e.Quantity=1,b=d;break}if(-1==b){if(JSON.parse(i).length>=10){var O=yield this.alertCtrl.create({message:"Orders should be 10 maximum.",buttons:[{text:"Ok",role:"cancel"}]});yield O.present()}else{var _=this.AddtoCartObject(e,o,"");this.itemsCart.push(_),sessionStorage.setItem("cart",JSON.stringify(this.itemsCart))}e.Quantity=1}else sessionStorage.setItem("cart",JSON.stringify(this.itemsCart)),e.Quantity=1;e.Quantity=1,this.msg.cartSubject.next(this.admincheckout.ngOnInit())}})},{text:"Close",role:"cancel"}]}),yield s.present();else if("Snacks"!=e.Category||"Fries"!=e.ProductName&&"Chicken Fingers"!=e.ProductName){var y=e.id;let c=-1;this.itemsCart=JSON.parse(sessionStorage.getItem("cart"));for(let o=0;o<this.itemsCart.length;o++)if(y==this.itemsCart[o].id&&this.itemsCart[o].ProductName==e.ProductName){this.itemsCart[o].Quantity=e.Quantity,e.Quantity=1,c=o;break}if(-1==c){if(JSON.parse(i).length>=10){var P=yield this.alertCtrl.create({message:"Orders should be 10 maximum.",buttons:[{text:"Ok",role:"cancel"}]});yield P.present()}else h=this.AddtoCartObject(e,"",""),this.itemsCart.push(h),sessionStorage.setItem("cart",JSON.stringify(this.itemsCart));e.Quantity=1}else sessionStorage.setItem("cart",JSON.stringify(this.itemsCart)),e.Quantity=1}else u=yield this.alertCtrl.create({header:"Please choose a flavor",inputs:[{type:"radio",label:"Cheese",value:"Cheese"},{type:"radio",label:"Sour Cream",value:"Sour Cream"},{type:"radio",label:"Bbq",value:"Bbq"}],buttons:[{text:"Go",handler:o=>(0,p.__awaiter)(this,void 0,void 0,function*(){if(null==o||null==o||""==o){var m=yield this.alertCtrl.create({message:"No flavor selected",buttons:[{text:"Ok",role:"cancel"}]});yield m.present()}else{var C=e.id;let b=-1;this.itemsCart=JSON.parse(sessionStorage.getItem("cart"));for(let d=0;d<this.itemsCart.length;d++)if(C==this.itemsCart[d].id&&this.itemsCart[d].ProductName==`${e.ProductName} ${o}`){this.itemsCart[d].Quantity=e.Quantity,e.Quantity=1,b=d;break}if(-1==b){if(JSON.parse(i).length>=10){var O=yield this.alertCtrl.create({message:"Orders should be 10 maximum.",buttons:[{text:"Ok",role:"cancel"}]});yield O.present()}else{var _=this.AddtoCartObject(e,"",o);this.itemsCart.push(_),sessionStorage.setItem("cart",JSON.stringify(this.itemsCart))}e.Quantity=1}else sessionStorage.setItem("cart",JSON.stringify(this.itemsCart)),e.Quantity=1;e.Quantity=1,this.msg.cartSubject.next(this.admincheckout.ngOnInit())}})},{text:"Close",role:"cancel"}]}),yield u.present();this.loadCart(),this.msg.cartSubject.next(this.admincheckout.ngOnInit())})}AddtoCartObject(e,i,n){return Object.assign({},e,{Category:e.Category,Description:e.Description,GramsPerOrder:"Milktea"!=e.Category||"Snacks"==e.Category?e.GramsPerOrder:"Small"==i?e.GramsPerOderSmall:e.GramsPerOderMedium,ImageUrl:e.ImageUrl,ProductName:"Milktea"!=e.Category?"Fries"==e.ProductName||"Chicken Fingers"==e.ProductName?`${e.ProductName} ${n}`:e.ProductName:`${e.ProductName} ${i}`,Quantity:e.Quantity,Stock:e.Stock,UnitPrice:"Milktea"!=e.Category||"Snacks"==e.Category?e.UnitPrice:"Small"==i?e.SmallPrice:e.MediumPrice,id:e.id})}parseToFloat(e){return parseFloat(e).toFixed(2)}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(I.g),t.Y36(g.Br),t.Y36(A.u),t.Y36(Q.ST),t.Y36(U.zQ),t.Y36(f.S$),t.Y36(v.F0),t.Y36(t.z2F),t.Y36(t.R0b),t.Y36(v.gz),t.Y36(g.HT),t.Y36(k.h))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-createpos"]],viewQuery:function(e,i){if(1&e&&t.Gf(w,5,t.SBq),2&e){let n;t.iGM(n=t.CRH())&&(i.productbtn=n.first)}},inputs:{title:"title"},decls:18,vars:2,consts:[["slot","start"],["menu","main-menu"],["slot","end"],["menu","cart"],["color","danger",4,"ngIf"],["name","cart-outline"],[1,"shop","container"],[1,"section-title"],[1,"shop-content"],["class","product-box",4,"ngFor","ngForOf"],["vertical","bottom","horizontal","end","slot","fixed"],[3,"click"],["name","search-outline"],["color","danger"],[1,"product-box"],["alt","",1,"product-img",3,"src"],[1,"product-title"],[4,"ngIf"],[1,"price"],["button","",1,"minus",3,"click"],["button","",1,"plus",3,"click"],["name","cart",1,"add-cart"]],template:function(e,i){1&e&&(t.TgZ(0,"ion-toolbar")(1,"ion-buttons",0),t._UZ(2,"ion-menu-button",1),t.TgZ(3,"ion-title"),t._uU(4,"POS"),t.qZA()(),t.TgZ(5,"ion-buttons",2)(6,"ion-menu-button",3),t.YNc(7,J,2,1,"ion-badge",4),t._UZ(8,"ion-icon",5),t.qZA()()(),t.TgZ(9,"ion-content")(10,"section",6)(11,"h2",7),t._uU(12,"PRODUCTS"),t.qZA(),t.TgZ(13,"div",8),t.YNc(14,G,15,5,"div",9),t.qZA()(),t.TgZ(15,"ion-fab",10)(16,"ion-fab-button",11),t.NdJ("click",function(){return i.SearchCategory()}),t._UZ(17,"ion-icon",12),t.qZA()()()),2&e&&(t.xp6(7),t.Q6J("ngIf",0!=i.numbers),t.xp6(7),t.Q6J("ngForOf",i.productList))},dependencies:[f.sg,f.O5,g.yp,g.Sm,g.W2,g.IJ,g.W4,g.gu,g.fG,g.wd,g.sr,f.H9],styles:["ion-toolbar[_ngcontent-%COMP%]{--background: #e5989b}ion-content[_ngcontent-%COMP%]{--background: #6d6875}ion-fab-button[_ngcontent-%COMP%]{--background: #ffb4a2}.minus[_ngcontent-%COMP%]{font-weight:600;padding:5px;margin-right:20px;cursor:pointer}.plus[_ngcontent-%COMP%]{margin-left:20px;font-weight:600;padding:5px;cursor:pointer}.plus[_ngcontent-%COMP%]:active{background-color:#3880ff}.minus[_ngcontent-%COMP%]:active{background-color:red}img[_ngcontent-%COMP%]{width:100%}header[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;background:var(--bg-color);box-shadow:0 1px 4px #2825251a;z-index:100}.nav[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:20px 0}.container[_ngcontent-%COMP%]{max-width:1068px;margin:auto;width:100%}.logo[_ngcontent-%COMP%]{font-size:1.1rem;color:var(--text-color);font-weight:400}#cart-icon[_ngcontent-%COMP%]{font-size:1.8rem;cursor:pointer}.cart[_ngcontent-%COMP%]{position:fixed;top:0;right:0;width:250px;min-height:100vh;padding:20px;background:var(--bg-color);box-shadow:-2px 0 4px #2825251a}section[_ngcontent-%COMP%]{padding:4rem 0 3rem}.section-title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:600;text-align:center;margin-bottom:1.5rem}.shop[_ngcontent-%COMP%]{margin-top:2rem}.shop-content[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,auto));gap:1.5rem}.product-box[_ngcontent-%COMP%]{position:relative}.product-box[_ngcontent-%COMP%]:hover{padding:10px;border:1px solid var(--text-color);transition:.4s}.product-img[_ngcontent-%COMP%]{width:70%;height:50%;margin-bottom:.5rem}.product-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;text-transform:uppercase;margin-bottom:.5rem}.price[_ngcontent-%COMP%]{font-weight:500}.add-cart[_ngcontent-%COMP%]{position:absolute;bottom:0;right:0;background:#ffb4a2;color:var(--bg-color);padding:10px;cursor:pointer}.add-cart[_ngcontent-%COMP%]:hover{background:hsl(249deg,32%,17%)}.cart-box[_ngcontent-%COMP%]{display:grid;grid-template-columns:32% 50% 18%;align-items:center;gap:1rem;margin-top:1rem}"]}),r})()}];let R=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[v.Bz.forChild(Y),v.Bz]}),r})(),$=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({providers:[k.h],imports:[f.ez,N.u5,g.Pc,R,N.UX]}),r})()}}]);