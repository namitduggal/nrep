import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  address:String="";
  mode:String;
  visibility:boolean=false;
  cardnum:String;
  compname:String;
  hname:String;
  expdate:String;
  cvvno:String;
  msg:String;
  constructor(private route:ActivatedRoute,private myrouter:Router,private myhttp:HttpClient) { 
    myrouter.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() {
    sessionStorage.setItem("url","checkout");
  }
  onrclick()
  {
    this.visibility=true;
  }
  onr1click()
  {
    this.visibility=false;
  }
  onpayment(myform)
  {
    if(myform.valid)
    {
    let params = {billtot:sessionStorage.getItem("billtotal"),add:this.address,un:sessionStorage.getItem("uname"),pmode:this.mode,cardno:this.cardnum,coname:this.compname,hname:this.hname,expdt:this.expdate,cvv:this.cvvno}
    this.myhttp.post("http://localhost:3000/api/checkout",params,{responseType:"text"}).subscribe(
      (response)=>
      {
        this.myrouter.navigateByUrl("/ordersummary");
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
else
{
  this.msg="invalid information";
}
  }
}
