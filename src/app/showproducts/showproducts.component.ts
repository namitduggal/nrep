import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';
@Directive({
  selector: '[onCreate]'
})

export class OnCreate {

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {      
     this.onCreate.emit('dummy'); 
  } 

}

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  allprods:any[];
  cat:string;
  scat:string;
  msg:string="";
  rate:number=null;
  price:number=null;
  visibility:boolean=false;
  ind:number=-1;
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }


  ngOnInit() {
    sessionStorage.setItem("url","showproducts");
    this.route.queryParams.subscribe(resp=>{
      this.cat=resp["catid"];
      this.scat=resp["subcatid"];
  });
  this.fetchproducts();
  }
  fetchproducts()
  {
    this.myhttp.get("http://localhost:3000/api/fetchprods/?catid="+this.cat+ "&scatid="+this.scat,{responseType:"json"}).subscribe((res:any[])=>
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
    this.ind=-1;
  }
  calc(prod,index)
  {
    this.rate=prod.prate;
    this.price=prod.prate*(100-prod.pdiscount)/100;
    this.ind=index;
  }
  tr(index):boolean
  {
    if(index==this.ind)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
