"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8309],{8309:(M,u,i)=>{i.r(u),i.d(u,{Admintab2PageModule:()=>B});var d=i(9808),p=i(4182),r=i(4153),s=i(1115),h=i(4850),t=i(6435),f=i(5920),P=i(2316);function b(n,l){if(1&n&&(t.TgZ(0,"ion-item",1)(1,"ion-avatar",2),t._UZ(2,"img",3),t.qZA(),t.TgZ(3,"ion-label")(4,"h2",4),t._uU(5),t.qZA(),t.TgZ(6,"p"),t._uU(7),t.qZA(),t.TgZ(8,"p"),t._uU(9),t.qZA()()()),2&n){const e=l.$implicit;t.MGl("routerLink","/orderdetails/",e.id,"/history"),t.xp6(5),t.AsE("",e.BillingFirstname," ",e.BillingLastname,""),t.xp6(2),t.Oqu(e.Datetime),t.xp6(2),t.Oqu(e.Status)}}const A=[{path:"",component:(()=>{class n{constructor(e,c,v,O,C){this.afstore=e,this.afauth=c,this.router=v,this.currencyPipe=O,this.alertCtrl=C,this.allPendingOrders=[],this.afauth.authState.subscribe(g=>{g&&g.uid&&(this.productReference=this.afstore.collection("History"),this.sub=this.productReference.snapshotChanges().pipe((0,h.U)(a=>a.map(o=>Object.assign({historyid:o.payload.doc.id},o.payload.doc.data())))).subscribe(a=>{console.log("all orders",a),a=(a=a.map((o,m)=>Object.assign({BillingAddress1:o.BillingAddress1,BillingAddress2:o.BillingAddress2,BillingFirstname:o.BillingFirstname,BillingIndexId:o.BillingIndexId,BillingLastname:o.BillingLastname,BillingPhonenumber:o.BillingPhonenumber,Billingemail:o.Billingemail,Datetime:o.Datetime,Status:"Closed"==o.Status?"Approved":"Cancelled",TotalAmount:o.TotalAmount,id:o.historyid,DatetimeToSort:o.DatetimeToSort,OrderDetails:o.OrderDetails}))).sort((o,m)=>Number(m.DatetimeToSort)-Number(o.DatetimeToSort)),console.log("the data",a),this.allPendingOrders=a}))})}ngOnInit(){}addproduct(){this.alertCtrl.create({header:"Choose",inputs:[{type:"radio",label:"POS",value:"POS"},{type:"radio",label:"View Products",value:"View Products"},{type:"radio",label:"Add Product",value:"Add Product"},{type:"radio",label:"Change Password",value:"Change Password"}],buttons:[{text:"Go",handler:e=>{console.log("data",e),"View Products"==e?this.router.navigateByUrl("/viewproducts"):"Add Product"==e?this.router.navigateByUrl("/add-product"):"POS"==e&&this.router.navigateByUrl("/createpos")}},{text:"Cancel",role:"cancel"}]}).then(e=>{e.present()})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(f.ST),t.Y36(P.zQ),t.Y36(s.F0),t.Y36(d.H9),t.Y36(r.Br))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-admintab2"]],decls:3,vars:1,consts:[["button","","lines","none",3,"routerLink",4,"ngFor","ngForOf"],["button","","lines","none",3,"routerLink"],["slot","start"],["src","https://thumbs.dreamstime.com/b/person-icon-flat-design-template-isolated-avatar-sign-vector-illustration-symbol-205838177.jpg"],["text-capitalize",""]],template:function(e,c){1&e&&(t.TgZ(0,"ion-content")(1,"ion-card"),t.YNc(2,b,10,5,"ion-item",0),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("ngForOf",c.allPendingOrders))},dependencies:[d.sg,r.BJ,r.PM,r.W2,r.Ie,r.Q$,r.YI,s.rH],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background: #69A03A;color:#fff;font-size:20px;line-height:84px}.addproduct[_ngcontent-%COMP%]{cursor:pointer}.addproduct[_ngcontent-%COMP%]:active{color:red}.labeldate[_ngcontent-%COMP%]{font-family:Verdana,Geneva,Tahoma,sans-serif;font-weight:900}.labelname[_ngcontent-%COMP%]{font-family:Trebuchet MS,Lucida Sans Unicode,Lucida Grande,Lucida Sans,Arial,sans-serif;font-weight:900;font-size:18px;color:#2f0101}.totalamount[_ngcontent-%COMP%]{font-family:Gill Sans,Gill Sans MT,Calibri,Trebuchet MS,sans-serif;font-weight:bolder}ion-accordion.accordion-expanded[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%]{--background: #69A03A;--color: #fff}"]}),n})()}];let y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[s.Bz.forChild(A),s.Bz]}),n})(),B=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[d.ez,p.u5,r.Pc,y]}),n})()}}]);