import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manageprod',
  templateUrl: './manageprod.component.html',
  styleUrls: ['./manageprod.component.css']
})
export class ManageprodComponent implements OnInit {
  cat:string="";
  scat:string="";
  prodname:string;
  msg:string;
  myfile:File;
  allcat:any[];
  allsubcat:any[];
  rate:string="";
  disc:string="";
  desc:string="";
  stock:string="";
  prodlist:any[];
  product:any;
  visibility:boolean=false;
  update:boolean=false;
  delete:boolean=false;
  showproduct:boolean=false;
  oldpicname:string;
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() {
   // this.check();
    this.fetchcategories();
  }

  check()
  {
    if(sessionStorage.getItem("utype")!="admin")
    {
     // alert("No Access product");
      this.router.navigateByUrl("/login");
    }
  }

  fetchcategories()
  {
    this.myhttp.get("http://localhost:3000/api/fetchcat",{responseType:"json"}).subscribe((res:any[])=>
    {
      this.allcat=res;
    })  
  }
  fetchproducts()
  {
    this.myhttp.get("http://localhost:3000/api/fetchprods/?catid="+this.cat+ "&scatid="+this.scat,{responseType:"json"}).subscribe((res:any[])=>
    {
      
      if(res.length>0)
      {
        this.prodlist=res;
        this.showproduct=true;
      }
      else{
        this.showproduct=false;
      }
    },
    (error)=>
    {
      this.msg=error;
    })   
  }
  fetchsubcat()
  {
    this.myhttp.get("http://localhost:3000/api/fetchsubcat?cid="+this.cat,{responseType:"json"}).subscribe((res:any[])=>
    {
      if(res.length>0)
      {
      this.allsubcat=res;
      }
      else
      {
        this.allsubcat=[];
        this.scat="";
        this.prodlist=[];
      }
    },
    (error)=>
    {
      this.msg=error;
    })  
  }
  fileselected(event)
  {
    this.myfile=event.target.files[0];
  }
  onscatadd()
  {
    alert(this.cat);
    var mydata=new FormData();
    if(this.myfile!=null)
    {
      mydata.append("photo",this.myfile);
    }
    mydata.append("prodname",this.prodname);
    mydata.append("subcatid",this.scat);
    mydata.append("catid",this.cat);
    mydata.append("prate",this.rate);
    mydata.append("pdiscount",this.disc);
    mydata.append("pdesc",this.desc);
    mydata.append("pstock",this.stock);
  this.myhttp.post("http://localhost:3000/api/manageprod",mydata,{responseType:"text"}).subscribe((res:any)=>
  {
    this.msg=res;
  },
  (error)=>
  {
    this.msg=error;
  })
  }

onprodupdate(prod)
{
      this.visibility=true;
      this.update=true;
      this.delete=false;
      this.product=prod;
      this.cat=this.product.catid;
      this.scat=this.product.subcatid;
      
      this.prodname=this.product.pname;
      this.rate=this.product.prate;
      this.disc=this.product.pdiscount;
      this.desc=this.product.pdesc;
      this.stock=this.product.pstock;
    
    
}
updateprod()
{
  this.product;
  this.oldpicname
  var mydata=new FormData();
  if(this.myfile!=null)
    {
      mydata.append("photo",this.myfile);
    }
    mydata.append("pid",this.product._id);
    mydata.append("oldpic",this.product.spic);
    mydata.append("prodname",this.prodname);
    mydata.append("subcatid",this.scat);
    mydata.append("catid",this.cat);
    mydata.append("prate",this.rate);
    mydata.append("pdiscount",this.disc);
    mydata.append("pdesc",this.desc);
    mydata.append("pstock",this.stock);
    this.myhttp.put("http://localhost:3000/api/updateprod",mydata,{responseType:"text"}).subscribe((res)=>{
    alert(res);},
    (error)=>{
      alert(error);
    }) 
}
onproddel(prod)
{
  var uresp=confirm("Are you sure you want to delete?");
    if(uresp==true)
    {
      this.myhttp.delete("http://localhost:3000/api/delprod/?pid="+prod._id+"&spic="+prod.spic,{responseType:"json"}).subscribe((res:any)=>
      {
        
        if(res.deletedCount==1)
        {
          alert("product deleted successfully");
          this.fetchproducts();
        }
        else{
          alert("product not deleted successfully");
        }
      },
      (error)=>
      {
        alert("error="+error);
      })
    }
}

}
