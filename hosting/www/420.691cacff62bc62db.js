"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[420],{80420:(E,m,s)=>{s.r(m),s.d(m,{Tab3PageModule:()=>Z});var b=s(40520),r=s(54153),p=s(41115),C=s(69808),d=s(34182),h=s(70655),n=s(6435),P=s(5920),O=s(72316),f=s(11423);function y(e,g){if(1&e){const i=n.EpF();n.TgZ(0,"ion-fab",22),n.NdJ("click",function(){n.CHM(i);const a=n.oxw();return n.KtG(a.getCurrentLocation())}),n.TgZ(1,"ion-fab-button"),n._UZ(2,"ion-icon",23),n.qZA()()}}const c=function(){return{standalone:!0}};let _=(()=>{class e{constructor(i,t,a,o,l,A,w,N){this.actRoute=i,this.afstore=t,this.afauth=a,this.loadingCtrl=o,this.alertCtrl=l,this.router=A,this.http=w,this.msg=N,this.getCartDetails=[],this.isDisabled=!1,this.isEdit=!1,this.name=this.actRoute.snapshot.paramMap.get("name"),this.afauth.authState.subscribe(M=>(0,h.__awaiter)(this,void 0,void 0,function*(){M&&M.uid&&(this.meReference=this.afstore.doc(`users/${M.uid}`),this.sub=this.meReference.valueChanges().subscribe(u=>{this.firstname=u.FirstName,this.lastname=u.LastName,this.email=u.Email,this.address1=u.Address1,this.address2=u.Address2,this.phonenumber=`${u.PhoneNumber}`}))}))}ngOnInit(){return(0,h.__awaiter)(this,void 0,void 0,function*(){if("edit"==this.name)this.isEdit=!0;else{this.isEdit=!1;var i=yield this.alertCtrl.create({header:"Warning!",message:"Kindly strictly check your location if correct, Once your are done finalizing your location, after confirming your order, dont move to the location where you located until your order is delivered thanks!.",buttons:[{text:"Ok!",role:"cancel"}]});yield i.present()}})}Edit(){return(0,h.__awaiter)(this,void 0,void 0,function*(){if("edit"==this.name)console.log("get cart",this.getCartDetails),this.loadingCtrl.create({message:"Editing Please Wait..."}).then(t=>{t.present(),this.alertCtrl.create({message:"You edited your information successfully",buttons:[{text:"Ok",role:"cancel"}]}).then(a=>{setTimeout(()=>{t.dismiss(),a.present(),this.meReference.update({FirstName:this.firstname,LastName:this.lastname,Address1:this.address1,Address2:this.address2,PhoneNumber:this.phonenumber})},3e3)}).catch(a=>{})}).catch(t=>{});else if(""===this.address1||""==this.address2){var i=yield this.alertCtrl.create({message:"Address 1 and 2 should'nt be empty",buttons:[{text:"Ok",role:"cancel"}]});yield i.present()}else this.loadingCtrl.create({message:"Editing Please Wait..."}).then(t=>{t.present(),this.alertCtrl.create({message:"You edited your information successfully",buttons:[{text:"Ok",role:"cancel"}]}).then(a=>{setTimeout(()=>{t.dismiss(),a.present(),this.meReference.update({FirstName:this.firstname,LastName:this.lastname,Address1:this.address1,Address2:this.address2,PhoneNumber:this.phonenumber}),this.router.navigateByUrl("/checkout")},3e3)}).catch(a=>{})}).catch(t=>{})})}getCurrentLocation(){return(0,h.__awaiter)(this,void 0,void 0,function*(){var i=yield this.loadingCtrl.create({message:"Getting your location...",spinner:"bubbles"});yield i.present(),navigator.geolocation.getCurrentPosition(t=>{console.log("bobo",t),this.msg.myLoc(t.coords.latitude,t.coords.longitude).subscribe(a=>(0,h.__awaiter)(this,void 0,void 0,function*(){var o=a.Response.View[0].Result[0].Location.Address,l=a.Response.View[0].Result[1].Location.Address;this.address1=`${o.HouseNumber} ${o.Street} ${o.District} ${o.City} ${o.County}, ${o.Label}`,this.address2=`${l.HouseNumber} ${l.Street} ${l.District} ${l.City} ${l.County}, ${l.Label}`,yield i.dismiss()}))})})}}return e.\u0275fac=function(i){return new(i||e)(n.Y36(p.gz),n.Y36(P.ST),n.Y36(O.zQ),n.Y36(r.HT),n.Y36(r.Br),n.Y36(p.F0),n.Y36(b.eN),n.Y36(f.g))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-tab3"]],decls:53,vars:23,consts:[["slot","start"],[1,"container"],[1,"title"],["action","#"],[1,"user-details"],[1,"input-box"],[1,"details"],["type","text","placeholder","Enter your firstname",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","text","placeholder","Enter your lastname",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","text","placeholder","Enter your email","disabled","",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["type","number","placeholder","Enter your number",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["disabled","","type","text","placeholder","Enter your address1",3,"ngModel","ngModelOptions","ngModelChange"],["disabled","","type","text","placeholder","Enter your address2",3,"ngModel","ngModelOptions","ngModelChange"],["hidden","",1,"gender-details"],[1,"gender-title"],[1,"category"],["for",""],[1,"dot","one"],[1,"gender"],[1,"button"],["type","submit","name","","value","Save Changes",3,"click"],["vertical","bottom","horizontal","end","slot","fixed",3,"click",4,"ngIf"],["vertical","bottom","horizontal","end","slot","fixed",3,"click"],["name","location-outline"]],template:function(i,t){1&i&&(n.TgZ(0,"ion-toolbar")(1,"ion-buttons",0),n._UZ(2,"ion-back-button"),n.qZA()(),n.TgZ(3,"ion-content")(4,"body")(5,"div",1)(6,"div",2),n._uU(7," Edit Information "),n.qZA(),n.TgZ(8,"form",3)(9,"div",4)(10,"div",5)(11,"span",6),n._uU(12,"First Name"),n.qZA(),n.TgZ(13,"input",7),n.NdJ("ngModelChange",function(o){return t.firstname=o}),n.qZA()(),n.TgZ(14,"div",5)(15,"span",6),n._uU(16,"Last Name"),n.qZA(),n.TgZ(17,"input",8),n.NdJ("ngModelChange",function(o){return t.lastname=o}),n.qZA()(),n.TgZ(18,"div",5)(19,"span",6),n._uU(20,"Email"),n.qZA(),n.TgZ(21,"input",9),n.NdJ("ngModelChange",function(o){return t.email=o}),n.qZA()(),n.TgZ(22,"div",5)(23,"span",6),n._uU(24,"Phone Number"),n.qZA(),n.TgZ(25,"input",10),n.NdJ("ngModelChange",function(o){return t.phonenumber=o}),n.qZA()(),n.TgZ(26,"div",5)(27,"span",6),n._uU(28,"Address 1"),n.qZA(),n.TgZ(29,"input",11),n.NdJ("ngModelChange",function(o){return t.address1=o}),n.qZA()(),n.TgZ(30,"div",5)(31,"span",6),n._uU(32,"Address 2"),n.qZA(),n.TgZ(33,"input",12),n.NdJ("ngModelChange",function(o){return t.address2=o}),n.qZA()()(),n.TgZ(34,"div",13)(35,"span",14),n._uU(36,"Gender"),n.qZA(),n.TgZ(37,"div",15)(38,"label",16),n._UZ(39,"span",17),n.TgZ(40,"span",18),n._uU(41,"Male"),n.qZA()(),n.TgZ(42,"label",16),n._UZ(43,"span",17),n.TgZ(44,"span",18),n._uU(45,"Female"),n.qZA()(),n.TgZ(46,"label",16),n._UZ(47,"span",17),n.TgZ(48,"span",18),n._uU(49,"Prefer not to say"),n.qZA()()()(),n.TgZ(50,"div",19)(51,"input",20),n.NdJ("click",function(){return t.Edit()}),n.qZA()()()()(),n.YNc(52,y,3,0,"ion-fab",21),n.qZA()),2&i&&(n.xp6(13),n.Q6J("disabled",!t.isEdit)("ngModel",t.firstname)("ngModelOptions",n.DdM(17,c)),n.xp6(4),n.Q6J("disabled",!t.isEdit)("ngModel",t.lastname)("ngModelOptions",n.DdM(18,c)),n.xp6(4),n.Q6J("disabled",!t.isEdit)("ngModel",t.email)("ngModelOptions",n.DdM(19,c)),n.xp6(4),n.Q6J("disabled",!t.isEdit)("ngModel",t.phonenumber)("ngModelOptions",n.DdM(20,c)),n.xp6(4),n.Q6J("ngModel",t.address1)("ngModelOptions",n.DdM(21,c)),n.xp6(4),n.Q6J("ngModel",t.address2)("ngModelOptions",n.DdM(22,c)),n.xp6(19),n.Q6J("ngIf",!t.isEdit))},dependencies:[r.oU,r.Sm,r.W2,r.IJ,r.W4,r.gu,r.sr,r.cs,C.O5,d._Y,d.Fj,d.wV,d.JJ,d.JL,d.On,d.F],styles:['ion-back-button[_ngcontent-%COMP%]{display:block}ion-toolbar[_ngcontent-%COMP%]{--background: #e5989b}ion-fab-button[_ngcontent-%COMP%]{--background: #ffb4a2}ion-content[_ngcontent-%COMP%]{--background: #6d6875;margin:0;padding:0;box-sizing:border-box;font-family:Poppins,sans-serif}ion-content[_ngcontent-%COMP%]   body[_ngcontent-%COMP%]{display:flex;height:100vh;justify-content:center;align-items:center;padding:10px;background:#6d6875}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{max-width:700px;width:100%;background:#6d6875;padding:25px 30px;border-radius:5px}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:25px;font-weight:500;position:relative}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;bottom:0;height:3px;width:30px;background:#6d6875}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between;margin:20px 0 12px}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{margin-bottom:15px;width:calc(50% - 20px)}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{display:block;font-weight:500;margin-bottom:5px}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:45px;width:100%;outline:none;border-radius:5px;border:1px solid #ccc;padding-left:15px;font-size:16px;border-bottom-width:2px;transition:all .3s ease}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid{border-color:#6d6875}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .gender-title[_ngcontent-%COMP%]{font-size:20px;font-weight:500}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{display:flex;width:80%;margin:14px 0;justify-content:space-between}ion-content[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:flex;align-items:center}ion-content[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]{height:18px;width:18px;background:#d9d9d9;border-radius:50%;margin-right:10px;border:5px solid transparent}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{height:45px;margin:45px 0}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:100%;width:100%;outline:none;color:#fff;border:none;font-size:18px;border-radius:5px;letter-spacing:1px;background:#ffb4a2}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{background:linear-gradient(135deg,#71b7e6,#9b59b6)}@media (max-width: 584px){ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{max-width:100%}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{margin-bottom:15px;width:100%}ion-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{width:100%}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]{max-height:300px;overflow-y:scroll}ion-content[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]::-webkit-scrollbar{width:0}}']}),e})();var T=s(581);const v=[{path:"",component:_}];let x=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[p.Bz.forChild(v),p.Bz]}),e})(),Z=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({providers:[f.g],imports:[r.Pc,C.ez,d.u5,T.e,p.Bz.forChild([{path:"",component:_}]),x,b.JF]}),e})()}}]);