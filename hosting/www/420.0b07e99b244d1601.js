"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[420],{80420:(N,m,a)=>{a.r(m),a.d(m,{Tab3PageModule:()=>A});var f=a(40520),r=a(54153),M=a(41115),C=a(69808),l=a(34182),g=a(70655),n=a(6435),O=a(5920),y=a(72316),_=a(11423);function v(t,c){if(1&t){const i=n.EpF();n.TgZ(0,"ion-fab",22),n.NdJ("click",function(){n.CHM(i);const s=n.oxw();return n.KtG(s.getCurrentLocation())}),n.TgZ(1,"ion-fab-button"),n._UZ(2,"ion-icon",23),n.qZA()()}}const u=function(){return{standalone:!0}};let P=(()=>{class t{constructor(i,e,s,o,d,p,w,J){this.actRoute=i,this.afstore=e,this.afauth=s,this.loadingCtrl=o,this.alertCtrl=d,this.router=p,this.http=w,this.msg=J,this.getCartDetails=[],this.isDisabled=!0,this.isEdit=!1,this.name=this.actRoute.snapshot.paramMap.get("name"),this.afauth.authState.subscribe(b=>(0,g.__awaiter)(this,void 0,void 0,function*(){b&&b.uid&&(this.meReference=this.afstore.doc(`users/${b.uid}`),this.sub=this.meReference.valueChanges().subscribe(h=>{this.firstname=h.FirstName,this.lastname=h.LastName,this.email=h.Email,this.address1=h.Address1,this.address2=h.Address2,this.phonenumber=`${h.PhoneNumber}`}))}))}ngOnInit(){return(0,g.__awaiter)(this,void 0,void 0,function*(){if("edit"==this.name)this.isEdit=!0;else{this.isEdit=!1;var i=yield this.alertCtrl.create({header:"Warning!",message:"Kindly strictly check your location if correct, Once your are done finalizing your location, after confirming your order, dont move to the location where you located until your order is delivered thanks!.",buttons:[{text:"Ok!",role:"cancel"}]});yield i.present()}})}Edit(){return(0,g.__awaiter)(this,void 0,void 0,function*(){if("edit"==this.name){var i=JSON.parse(sessionStorage.getItem("cart")),e=yield this.loadingCtrl.create({message:"Editing Please Wait...",spinner:"bubbles"});yield e.present();var s=yield this.alertCtrl.create({message:"You edited your information successfully",buttons:[{text:"Ok",role:"cancel"}]});setTimeout(()=>(0,g.__awaiter)(this,void 0,void 0,function*(){yield e.dismiss(),this.meReference.update({FirstName:this.firstname,LastName:this.lastname,Address1:this.address1,Address2:this.address2,PhoneNumber:this.phonenumber}).then(d=>(0,g.__awaiter)(this,void 0,void 0,function*(){yield s.present(),i.length>0&&this.router.navigateByUrl("/checkout")}))}),2e3)}else if(""===this.address1||""==this.address2){var o=yield this.alertCtrl.create({message:"Address 1 and 2 should'nt be empty",buttons:[{text:"Ok",role:"cancel"}]});yield o.present()}else this.loadingCtrl.create({message:"Editing Please Wait..."}).then(d=>{d.present(),this.alertCtrl.create({message:"You edited your information successfully",buttons:[{text:"Ok",role:"cancel"}]}).then(p=>{setTimeout(()=>{d.dismiss(),p.present(),this.meReference.update({FirstName:this.firstname,LastName:this.lastname,Address1:this.address1,Address2:this.address2,PhoneNumber:this.phonenumber}),this.router.navigateByUrl("/checkout")},3e3)}).catch(p=>{})}).catch(d=>{})})}getCurrentLocation(){return(0,g.__awaiter)(this,void 0,void 0,function*(){var i=yield this.loadingCtrl.create({message:"Getting your location...",spinner:"bubbles"});yield i.present(),navigator.geolocation.getCurrentPosition(e=>{this.msg.myLoc(e.coords.latitude,e.coords.longitude).subscribe(s=>(0,g.__awaiter)(this,void 0,void 0,function*(){var o=s.Response.View[0].Result[0].Location.Address,d=s.Response.View[0].Result[1].Location.Address;this.address1=`${o.Street} ${o.District} ${o.Label}`,this.address2=`${o.Street} ${d.District} ${d.Label}`,yield i.dismiss();var p=yield this.alertCtrl.create({message:"If your current location doesn't correct, you can edit it manually.",buttons:[{text:"Ok",role:"cancel"}]});yield p.present(),this.isDisabled=!1}))})})}}return t.\u0275fac=function(i){return new(i||t)(n.Y36(M.gz),n.Y36(O.ST),n.Y36(y.zQ),n.Y36(r.HT),n.Y36(r.Br),n.Y36(M.F0),n.Y36(f.eN),n.Y36(_.g))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-tab3"]],decls:53,vars:25,consts:[["slot","start"],[1,"container"],[1,"title"],["action","#"],[1,"user-details"],[1,"input-box"],[1,"details"],["type","text","placeholder","Enter your firstname",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","text","placeholder","Enter your lastname",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","text","placeholder","Enter your email","disabled","",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","number","placeholder","Enter your number",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","text","placeholder","Enter your address1",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","text","placeholder","Enter your address2",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["hidden","",1,"gender-details"],[1,"gender-title"],[1,"category"],["for",""],[1,"dot","one"],[1,"gender"],[1,"button"],["type","submit","name","","value","Save Changes",3,"click"],["vertical","bottom","horizontal","end","slot","fixed",3,"click",4,"ngIf"],["vertical","bottom","horizontal","end","slot","fixed",3,"click"],["name","location-outline"]],template:function(i,e){1&i&&(n.TgZ(0,"ion-toolbar")(1,"ion-buttons",0),n._UZ(2,"ion-back-button"),n.qZA()(),n.TgZ(3,"ion-content")(4,"body")(5,"div",1)(6,"div",2),n._uU(7," Edit Information "),n.qZA(),n.TgZ(8,"form",3)(9,"div",4)(10,"div",5)(11,"span",6),n._uU(12,"First Name"),n.qZA(),n.TgZ(13,"input",7),n.NdJ("ngModelChange",function(o){return e.firstname=o}),n.qZA()(),n.TgZ(14,"div",5)(15,"span",6),n._uU(16,"Last Name"),n.qZA(),n.TgZ(17,"input",8),n.NdJ("ngModelChange",function(o){return e.lastname=o}),n.qZA()(),n.TgZ(18,"div",5)(19,"span",6),n._uU(20,"Email"),n.qZA(),n.TgZ(21,"input",9),n.NdJ("ngModelChange",function(o){return e.email=o}),n.qZA()(),n.TgZ(22,"div",5)(23,"span",6),n._uU(24,"Phone Number"),n.qZA(),n.TgZ(25,"input",10),n.NdJ("ngModelChange",function(o){return e.phonenumber=o}),n.qZA()(),n.TgZ(26,"div",5)(27,"span",6),n._uU(28,"Address 1"),n.qZA(),n.TgZ(29,"input",11),n.NdJ("ngModelChange",function(o){return e.address1=o}),n.qZA()(),n.TgZ(30,"div",5)(31,"span",6),n._uU(32,"Address 2"),n.qZA(),n.TgZ(33,"input",12),n.NdJ("ngModelChange",function(o){return e.address2=o}),n.qZA()()(),n.TgZ(34,"div",13)(35,"span",14),n._uU(36,"Gender"),n.qZA(),n.TgZ(37,"div",15)(38,"label",16),n._UZ(39,"span",17),n.TgZ(40,"span",18),n._uU(41,"Male"),n.qZA()(),n.TgZ(42,"label",16),n._UZ(43,"span",17),n.TgZ(44,"span",18),n._uU(45,"Female"),n.qZA()(),n.TgZ(46,"label",16),n._UZ(47,"span",17),n.TgZ(48,"span",18),n._uU(49,"Prefer not to say"),n.qZA()()()(),n.TgZ(50,"div",19)(51,"input",20),n.NdJ("click",function(){return e.Edit()}),n.qZA()()()()(),n.YNc(52,v,3,0,"ion-fab",21),n.qZA()),2&i&&(n.xp6(13),n.Q6J("disabled",!e.isEdit)("ngModel",e.firstname)("ngModelOptions",n.DdM(19,u)),n.xp6(4),n.Q6J("disabled",!e.isEdit)("ngModel",e.lastname)("ngModelOptions",n.DdM(20,u)),n.xp6(4),n.Q6J("disabled",!e.isEdit)("ngModel",e.email)("ngModelOptions",n.DdM(21,u)),n.xp6(4),n.Q6J("disabled",!e.isEdit)("ngModel",e.phonenumber)("ngModelOptions",n.DdM(22,u)),n.xp6(4),n.Q6J("disabled",e.isDisabled)("ngModel",e.address1)("ngModelOptions",n.DdM(23,u)),n.xp6(4),n.Q6J("disabled",e.isDisabled)("ngModel",e.address2)("ngModelOptions",n.DdM(24,u)),n.xp6(19),n.Q6J("ngIf",!e.isEdit))},dependencies:[r.oU,r.Sm,r.W2,r.IJ,r.W4,r.gu,r.sr,r.cs,C.O5,l._Y,l.Fj,l.wV,l.JJ,l.JL,l.On,l.F],styles:['ion-back-button[_ngcontent-%COMP%]{display:block}ion-toolbar[_ngcontent-%COMP%]{--background: #e5989b}ion-fab-button[_ngcontent-%COMP%]{--background: #ffb4a2}ion-content[_ngcontent-%COMP%]{--background: #6d6875;margin:0;padding:0;box-sizing:border-box;font-family:Poppins,sans-serif}ion-content[_ngcontent-%COMP%]   body[_ngcontent-%COMP%]{display:flex;height:100vh;justify-content:center;align-items:center;padding:10px;background:#6d6875}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{max-width:700px;width:100%;background:#6d6875;padding:25px 30px;border-radius:5px}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:25px;font-weight:500;position:relative}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;bottom:0;height:3px;width:30px;background:#6d6875}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between;margin:20px 0 12px}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{margin-bottom:15px;width:calc(50% - 20px)}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{display:block;font-weight:500;margin-bottom:5px}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:45px;width:100%;outline:none;border-radius:5px;border:1px solid #ccc;padding-left:15px;font-size:16px;border-bottom-width:2px;transition:all .3s ease}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid{border-color:#6d6875}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .gender-title[_ngcontent-%COMP%]{font-size:20px;font-weight:500}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{display:flex;width:80%;margin:14px 0;justify-content:space-between}ion-content[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:flex;align-items:center}ion-content[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]{height:18px;width:18px;background:#d9d9d9;border-radius:50%;margin-right:10px;border:5px solid transparent}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{height:45px;margin:45px 0}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:100%;width:100%;outline:none;color:#fff;border:none;font-size:18px;border-radius:5px;letter-spacing:1px;background:#ffb4a2}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{background:linear-gradient(135deg,#71b7e6,#9b59b6)}@media (max-width: 584px){ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{max-width:100%}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{margin-bottom:15px;width:100%}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{width:100%}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]{max-height:300px;overflow-y:scroll}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]::-webkit-scrollbar{width:0}}']}),t})();var T=a(581);const x=[{path:"",component:P}];let Z=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[M.Bz.forChild(x),M.Bz]}),t})(),A=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({providers:[_.g],imports:[r.Pc,C.ez,l.u5,T.e,M.Bz.forChild([{path:"",component:P}]),Z,f.JF]}),t})()}}]);