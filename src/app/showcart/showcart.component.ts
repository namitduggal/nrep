import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { calcBindingFlags } from '@angular/core/src/view/util';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-showcart',
  templateUrl: './showcart.component.html',
  styleUrls: ['./showcart.component.css']
})
export class ShowcartComponent implements OnInit {

  visibility:boolean=false;
  prodlist:any[];
  msg:string;
  total:number;
  gtotal:string;
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() {
    sessionStorage.setItem("url","showcart");
    this.fetchcart();
  }
  fetchcart()
  {
    this.myhttp.get("https://ecommerce-webpage-try.herokuapp.com/api/getcartprods/?un="+sessionStorage.getItem('uname'),{responseType:"json"}).subscribe((res:any[])=>{
      if(res.length>0)
      {
        this.visibility=true;
        this.prodlist=res;
        this.cal();
      }
      else
      {
        this.visibility=false;
      }
    },
    (error)=>
    {
      this.msg=error;
    })
  }
  removeitem(cid)
  {
    var uresp=confirm("Are you sure you want to remove?");
    if(uresp==true)
    {
      this.myhttp.delete("https://ecommerce-webpage-try.herokuapp.com/api/removecartitems/?cid="+cid,{responseType:"json"}).subscribe((res:any)=>
      {
        
        if(res.deletedCount==1)
        {
          alert("product removed successfully");
          this.fetchcart();
        }
        else{
          alert("product cannot be removed");
        }
      },
      (error)=>
      {
        alert("error="+error);
        console.log(error);
      })
    }
  }
  cal()
  {
    this.total=0;
    for(let i=0;i<this.prodlist.length;i++)
    {
      this.total=Number(this.total)+Number(this.prodlist[i].tc);
    }
    this.gtotal=this.total.toString();
    sessionStorage.setItem("billtotal",this.gtotal);
  }
}
