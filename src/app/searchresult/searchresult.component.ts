import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  pname:string="";
  allprods:any[];
  msg:string="";
  rate:number=null;
  price:number=null;
  visibility:boolean=false;

  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }


  ngOnInit() {
    sessionStorage.setItem("url","homepage");
    this.route.queryParams.subscribe(resp=>{
      this.pname=resp["pname"];
  });
  this.fetchproducts();
}
fetchproducts()
  {
    this.myhttp.get("http://localhost:3000/api/fetchprodbyname/?pname="+this.pname,{responseType:"json"}).subscribe((res:any[])=>
    {
      
      if(res.length>0)
      {
        this.allprods=res;
      }
      else{
        this.msg="No products found";
      }
    },
    (error)=>
    {
      this.msg=error;
    })   
  }
  left()
  {
    this.rate=null;
    this.price=null;
    this.visibility=false;
  }
  calc(prod)
  {
    this.rate=prod.prate;
    this.price=prod.prate*(100-prod.pdiscount)/100;
    this.visibility=true;
  }

}
