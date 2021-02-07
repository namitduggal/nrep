import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-showproductdetails',
  templateUrl: './showproductdetails.component.html',
  styleUrls: ['./showproductdetails.component.css']
})
export class ShowproductdetailsComponent implements OnInit {

  prodid:string;
  prod:any;
  msg:string;
  rate:number;
  price:number;
  quantity:any="";
  showstock:number[]=[1];
  visibility:boolean=false;
  uname:string;
  exist:boolean=false;
  cart:any;
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }
  ngOnInit() {
    sessionStorage.setItem("url","productdetails");
    this.route.queryParams.subscribe(resp=>{
      this.prodid=resp["pid"];
  });
  this.fetchproducts();
}
fetchproducts()
  {
    this.myhttp.get("http://localhost:3000/api/fetchprodsbyid/?pid="+this.prodid,{responseType:"json"}).subscribe((res:any[])=>
    {
      
      if(res.length>0&&res[0].pstock>0)
      {
        this.visibility=true;
        this.prod=res[0];
        this.rate=this.prod.prate;
        this.price=this.prod.prate*(100-this.prod.pdiscount)/100;
        this.fetchstock();
      }
      else{
        this.visibility=false;
        this.msg="Out of Stock!!";
      }
    },
    (error)=>
    {
      this.msg=error;
    })   
  }
  fetchstock()
  {
    this.showstock.splice(0);
    for(let i=1;i<=this.prod.pstock;i++)
    {
      if(i>10)
      {
        break;
      }
      this.showstock.push(i);
    }
  }
  onadding()
  {
    if(this.quantity<1)
    {
      alert("Select amount");
      return;
    }
    this.uname=sessionStorage.getItem("uname");
    if(this.uname==null)
    {
      alert("please login to add to cart");
      return;
    }
    else
    {
      this.check();
    }
  }
  check()
  {
    this.myhttp.get("http://localhost:3000/api/checkcartprods/?un="+this.uname+"&prodid="+this.prodid,{responseType:"json"}).subscribe((res:any[])=>
    {
      if(res.length>0)
      {
        this.cart=res[0];
        this.updcart();
      }
      else{
        this.exist=false;
        this.newcart();
      }
      this.router.navigateByUrl("/showcart");
    },
    (error)=>
    {
      this.msg=error;
    })   
  }
  updcart()
  {
    this.cart.qt=Number(this.cart.qt)+Number(this.quantity);
        this.cart.tc=Number(this.cart.qt*this.cart.prate);
        this.myhttp.put("http://localhost:3000/api/updatecart",this.cart,{responseType:"text"}).subscribe((res)=>{
          alert(res);},
          (error)=>{
            alert(error);
          }) 
  }
  newcart()
  {
    var vals={pid:this.prod._id,pname:this.prod.pname,prate:this.price,qt:this.quantity,
      tc:this.price*this.quantity,ppic:this.prod.spic,username:this.uname};

      this.myhttp.post("http://localhost:3000/api/addcart",vals,
    {responseType:"text"}).subscribe(
      (response)=>
      {
      this.msg=response;
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
}
