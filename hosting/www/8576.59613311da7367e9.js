"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8576],{28576:(D,f,a)=>{a.r(f),a.d(f,{CheckoutPageModule:()=>S});var l=a(69808),d=a(34182),s=a(54153),u=a(41115),P=a(70655),O=a(24850),y=a(15439),t=a(6435),M=a(72316),x=a(5920),_=a(11423);function Z(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"tr")(1,"td")(2,"div",4),t._UZ(3,"img",5),t.TgZ(4,"div")(5,"p"),t._uU(6),t._UZ(7,"br"),t.TgZ(8,"small"),t._uU(9),t.ALo(10,"currency"),t.qZA(),t._UZ(11,"br"),t.TgZ(12,"a",6),t.NdJ("click",function(){const c=t.CHM(e).$implicit,h=t.oxw();return t.KtG(h.singleDelete(c))}),t._uU(13,"Remove"),t.qZA()()()()(),t.TgZ(14,"td"),t._UZ(15,"input",7),t.qZA(),t.TgZ(16,"td"),t._uU(17),t.ALo(18,"currency"),t.qZA()()}if(2&n){const e=r.$implicit;t.xp6(3),t.s9C("src",e.ImageUrl,t.LSH),t.xp6(3),t.hij("",e.ProductName," "),t.xp6(3),t.hij("Price: ",t.xi3(10,5,e.UnitPrice,"\u20b1"),""),t.xp6(6),t.s9C("value",e.Quantity),t.xp6(2),t.Oqu(t.xi3(18,8,e.Quantity*e.UnitPrice,"\u20b1"))}}function b(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"ion-button",6),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.OrderNow())}),t._uU(1,"Confirm Order"),t.qZA()}}function I(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",8)(1,"table")(2,"tr")(3,"td"),t._uU(4,"Subtotal"),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.ALo(7,"currency"),t.qZA()(),t.TgZ(8,"tr")(9,"td"),t._uU(10,"Delivery Fee"),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.ALo(13,"currency"),t.qZA()(),t.TgZ(14,"tr")(15,"td"),t._uU(16,"Total Amount"),t.qZA(),t.TgZ(17,"td"),t._uU(18),t.ALo(19,"currency"),t.qZA()(),t.TgZ(20,"tr")(21,"td"),t._uU(22,"Payment Method"),t.qZA(),t.TgZ(23,"td")(24,"ion-select",9),t.NdJ("ngModelChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.PaymentMethod=i)}),t.TgZ(25,"ion-select-option",10),t._uU(26,"Cash"),t.qZA(),t.TgZ(27,"ion-select-option",11),t._uU(28,"G Cash"),t.qZA()()()(),t.TgZ(29,"tr"),t._UZ(30,"td"),t.TgZ(31,"td"),t.YNc(32,b,2,0,"ion-button",12),t.qZA()()()()}if(2&n){const e=t.oxw();t.xp6(6),t.Oqu(t.xi3(7,5,e.total,"\u20b1")),t.xp6(6),t.Oqu(t.xi3(13,8,30,"\u20b1")),t.xp6(6),t.Oqu(t.xi3(19,11,e.total+30,"\u20b1")),t.xp6(6),t.Q6J("ngModel",e.PaymentMethod),t.xp6(8),t.Q6J("ngIf",e.total>0)}}const v=[{path:"",component:(()=>{class n{constructor(e,o,i,c,h,U){this.alertCtrl=e,this.locationStrategy=o,this.router=i,this.afauth=c,this.afstore=h,this.msg=U,this.getCartDetails=[],this.total=0,this.cartItem=0,this.getOrders=[],this.myInformation={},this.PaymentMethod="",this.afauth.authState.subscribe(m=>{m&&m.uid&&(this.meReference=h.doc(`users/${m.uid}`),this.sub=this.meReference.valueChanges().subscribe(T=>{this.myInformation=T,this.afstore.collection("Orders").snapshotChanges().pipe((0,O.U)(C=>C.map(g=>Object.assign({id:g.payload.doc.id},g.payload.doc.data())))).subscribe(C=>{this.getOrders=C,console.log("orders",this.getOrders);var g=this.getOrders;g=g.map((p,N)=>(console.log("orders",p),Object.assign({},p,{})))})}))})}ngOnInit(){this.CartDetails(),this.loadCart()}CartDetails(){sessionStorage.getItem("cart")&&(this.getCartDetails=JSON.parse(sessionStorage.getItem("cart")))}inc(e,o){for(let i=0;i<this.getCartDetails.length;i++)this.getCartDetails[i].id===e&&(this.getCartDetails[i].Quantity=o+1);sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart()}dec(e,o){for(let i=0;i<this.getCartDetails.length;i++)this.getCartDetails[i].id===e&&1!=o&&(this.getCartDetails[i].Quantity=o-1);sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart()}loadCart(){sessionStorage.getItem("cart")&&(this.getCartDetails=JSON.parse(sessionStorage.getItem("cart")),this.total=this.getCartDetails.reduce((e,o)=>e+o.UnitPrice*o.Quantity,0))}removeall(){sessionStorage.removeItem("cart"),this.getCartDetails=[],this.total=0,this.cartItem=0,this.msg.cartSubject.next(this.cartItem),this.loadCart()}singleDelete(e){if(sessionStorage.getItem("cart")){this.getCartDetails=JSON.parse(sessionStorage.getItem("cart"));for(let o=0;o<this.getCartDetails.length;o++)this.getCartDetails[o].id===e.id&&(this.getCartDetails.splice(o,1),sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart(),this.cartItemFunc())}}cartItemFunc(){var e=JSON.parse(sessionStorage.getItem("cart"));this.cartItem=e.length,this.msg.cartSubject.next(this.cartItem)}gotohome(){this.router.navigate(["tabs"])}OrderNow(){return(0,P.__awaiter)(this,void 0,void 0,function*(){if(""==this.PaymentMethod||null==this.PaymentMethod||null==this.PaymentMethod){var e=yield this.alertCtrl.create({message:"Payment method is required",buttons:[{text:"Ok",role:"cancel"}]});yield e.present()}else this.alertCtrl.create({message:"Are you sure you want to finalize your order?",buttons:[{text:"Ok",handler:()=>{this.alertCtrl.create({message:"Ordered Successfully!",buttons:[{text:"Ok",role:"cancel"}]}).then(o=>{if(this.myInformation.FirstName&&this.myInformation.LastName&&this.myInformation.Address1&&this.myInformation.Address2&&this.myInformation.PhoneNumber){o.present();var i=y(new Date).format("MM-DD-YYYY hh:mm A");this.total=this.total+30,this.afstore.collection("Orders").add({OrderDetails:this.getCartDetails,BillingFirstname:this.myInformation.FirstName,BillingLastname:this.myInformation.LastName,BillingAddress1:this.myInformation.Address1,BillingAddress2:this.myInformation.Address2,BillingPhonenumber:this.myInformation.PhoneNumber,Billingemail:this.myInformation.Email,BillingIndexId:this.myInformation.Uid,Status:"Pending",Datetime:i,TotalAmount:parseFloat(this.total.toString()).toFixed(2),DatetimeToSort:new Date,PaymentMethod:this.PaymentMethod}).then(c=>{this.removeall(),this.meReference.update({Address1:"",Address2:""})}).catch(c=>{alert(c)})}else this.alertCtrl.create({message:"Please fill up about your details first.",buttons:[{text:"Ok",handler:()=>{this.router.navigateByUrl("/editinfo/edit")}}]}).then(c=>{c.present()})})}},{text:"Cancel",role:"cancel"}]}).then(o=>{o.present()})})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(s.Br),t.Y36(l.S$),t.Y36(u.F0),t.Y36(M.zQ),t.Y36(x.ST),t.Y36(_.g))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-checkout"]],decls:18,vars:2,consts:[["slot","start"],[1,"small-container","cart-page"],[4,"ngFor","ngForOf"],["class","total-price",4,"ngIf"],[1,"cart-info"],[3,"src"],[3,"click"],["type","text","disabled","",3,"value"],[1,"total-price"],[3,"ngModel","ngModelChange"],["value","Cash"],["value","G Cash"],[3,"click",4,"ngIf"]],template:function(e,o){1&e&&(t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),t._UZ(3,"ion-back-button"),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5,"Check Out"),t.qZA()()(),t.TgZ(6,"ion-content")(7,"div",1)(8,"table")(9,"tr")(10,"th"),t._uU(11,"Product"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"Quantity"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"Subtotal"),t.qZA()(),t.YNc(16,Z,19,11,"tr",2),t.qZA(),t.YNc(17,I,33,14,"div",3),t.qZA()()),2&e&&(t.xp6(16),t.Q6J("ngForOf",o.getCartDetails),t.xp6(1),t.Q6J("ngIf",o.total>0))},dependencies:[l.sg,l.O5,d.JJ,d.On,s.oU,s.YG,s.Sm,s.W2,s.Gu,s.t9,s.n0,s.wd,s.sr,s.QI,s.cs,l.H9],styles:["ion-back-button[_ngcontent-%COMP%]{display:block}ion-toolbar[_ngcontent-%COMP%]{--background: #e5989b}ion-button[_ngcontent-%COMP%]{--background: #ffb4a2}ion-content[_ngcontent-%COMP%]{--background: #6d6875}ion-content[_ngcontent-%COMP%]   .cart-page[_ngcontent-%COMP%]{margin:16px auto;border:12vmax}ion-content[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse}ion-content[_ngcontent-%COMP%]   .cart-info[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}ion-content[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-align:left;padding:5px;color:#fff;font-weight:400;background:#e5989b}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px 5px}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:40px;height:30px;padding:5px}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#ff523b;font-size:14px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;cursor:pointer}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;height:80px;margin-right:10px}ion-content[_ngcontent-%COMP%]   .total-price[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}ion-content[_ngcontent-%COMP%]   .total-price[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{border-top:3px solid #ff523b;width:100%;max-width:370px}ion-content[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child{text-align:right}ion-content[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child{text-align:right}"]}),n})()}];let A=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[u.Bz.forChild(v),u.Bz]}),n})(),S=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez,d.u5,s.Pc,A]}),n})()}}]);