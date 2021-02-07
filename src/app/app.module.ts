import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import{HttpClientModule} from '@angular/common/http';
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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomepageComponent,
    SignupComponent,
    ListofmembersComponent,
    SignoutComponent,
    PasswordComponent,
    AdminpanelComponent,
    AddadminComponent,
    ManagecatComponent,
    SubcatComponent,
    ManageprodComponent,
    ShowcatlistComponent,
    ShowsubcatlistComponent,
    ShowproductsComponent,
    ShowproductdetailsComponent,
    ShowcartComponent,
    CheckoutComponent,
    OrdersummaryComponent,
    MyordersComponent,
    AdmallordersComponent,
    AdmupdstatusComponent,
    SearchresultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
