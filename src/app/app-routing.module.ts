import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListofmembersComponent } from './listofmembers/listofmembers.component';
import { SignoutComponent } from './signout/signout.component';
import { PasswordComponent } from './password/password.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { ManagecatComponent } from './managecat/managecat.component';
import { SubcatComponent } from './subcat/subcat.component';
import { ManageprodComponent } from './manageprod/manageprod.component';
import { ShowcatlistComponent } from './showcatlist/showcatlist.component';
import { ShowsubcatlistComponent } from './showsubcatlist/showsubcatlist.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { ShowproductdetailsComponent } from './showproductdetails/showproductdetails.component';
import { ShowcartComponent } from './showcart/showcart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { MyordersComponent } from './myorders/myorders.component';
import { AdmallordersComponent } from './admallorders/admallorders.component';
import { AdmupdstatusComponent } from './admupdstatus/admupdstatus.component';
import { SearchresultComponent } from './searchresult/searchresult.component';

const routes: Routes = [
  {
    path:"homepage",
    component:HomepageComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"listmembers",
    component:ListofmembersComponent
  },
  {
    path:"signout",
    component:SignoutComponent
  },
  {
    path:"password",
    component:PasswordComponent
  },
  {
    path:"adminpanel",
    component:AdminpanelComponent
  },
  {
    path:"addadmin",
    component:AddadminComponent
  },
  {
    path:"managecat",
    component:ManagecatComponent
  },
  {
    path:"managesubcat",
    component:SubcatComponent
  },
  {
    path:"manageprod",
    component:ManageprodComponent
  },
  {
    path:"showcategories",
    component:ShowcatlistComponent
  },
  {
    path:"showsubcategories",
    component:ShowsubcatlistComponent
  },
  {
    path:"showproducts",
    component:ShowproductsComponent
  },
  {
    path:"productdetails",
    component:ShowproductdetailsComponent
  },
  {
    path:"showcart",
    component:ShowcartComponent
  },
  {
    path:"checkout",
    component:CheckoutComponent
  },
  {
    path:"ordersummary",
    component:OrdersummaryComponent
  },
  {
    path:"myorders",
    component:MyordersComponent
  },
  {
    path:"allorders",
    component:AdmallordersComponent
  },
  {
    path:"updatestatus",
    component:AdmupdstatusComponent
  },
  {
    path:"searchresult",
    component:SearchresultComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
