"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9982],{9982:(v,s,a)=>{a.r(s),a.d(s,{AdminpagePageModule:()=>P});var d=a(9808),g=a(4182),n=a(4153),i=a(1115),t=a(6435),p=a(3388),h=a(6266);const m=[{path:"",component:(()=>{class o{constructor(e,l,c,u,A){this.locationStrategy=e,this.alertCtrl=l,this.auth=c,this.plt=u,this.router=A}ngOnInit(){}onChange(e){this.queryinput=e}approveOrder(e){console.log("approved",e)}cancelOrder(e){console.log("cancelled",e)}logout(){this.alertCtrl.create({message:"Are you sure you want to logout?",buttons:[{text:"Yes",handler:()=>{this.auth.SignOut()}},{text:"No",role:"cancel"}]}).then(e=>{e.present()})}addproduct(){this.alertCtrl.create({header:"Choose",inputs:[{type:"radio",label:"POS",value:"POS"},{type:"radio",label:"View Products",value:"View Products"},{type:"radio",label:"Add Product",value:"Add Product"},{type:"radio",label:"Log out",value:"Log out"}],buttons:[{text:"Go",handler:e=>{console.log("data",e),"View Products"==e?this.router.navigateByUrl("/viewproducts"):"Add Product"==e?this.router.navigateByUrl("/add-product"):"POS"==e?this.router.navigateByUrl("/createpos"):"Log out"==e&&this.logout()}},{text:"Cancel",role:"cancel"}]}).then(e=>{e.present()})}handleChange(e){const l=e.target.value.toLowerCase();this.queryinput=l}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(d.S$),t.Y36(n.Br),t.Y36(p.u),t.Y36(n.t4),t.Y36(i.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-adminpage"]],decls:8,vars:2,consts:[["slot","start"],["menu","main-menu"],["show-clear-button","always","clear-icon","trash-bin","placeholder","Fullname & Email",3,"debounce","ionChange"],[3,"categoryId"]],template:function(e,l){1&e&&(t.TgZ(0,"ion-toolbar")(1,"ion-buttons",0),t._UZ(2,"ion-menu-button",1),t.TgZ(3,"ion-title"),t._uU(4,"Online Orders"),t.qZA()(),t.TgZ(5,"ion-searchbar",2),t.NdJ("ionChange",function(u){return l.handleChange(u)}),t.qZA()(),t.TgZ(6,"ion-content"),t._UZ(7,"app-admintab1",3),t.qZA()),2&e&&(t.xp6(5),t.Q6J("debounce",1e3),t.xp6(2),t.Q6J("categoryId",l.queryinput))},dependencies:[n.Sm,n.W2,n.fG,n.VI,n.wd,n.sr,n.j9,h.H]}),o})()}];let y=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[i.Bz.forChild(m),i.Bz]}),o})(),P=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[d.ez,g.u5,n.Pc,y]}),o})()}}]);