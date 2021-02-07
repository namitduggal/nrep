import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-subcat',
  templateUrl: './subcat.component.html',
  styleUrls: ['./subcat.component.css']
})
export class SubcatComponent implements OnInit {
  cat:string="";
  scatname:string;
  msg:string;
  myfile:File;
  allcat:any[];
  allsubcat:any[];
  visibility:boolean=false;
  update:boolean=false;
  delete:boolean=false;
  subcat:any;
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() {
    this.check();
    this.fetchcategories();
  }

  check()
  {
    if(sessionStorage.getItem("utype")!="admin")
    {
      alert("No Access");
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
    mydata.append("scatname",this.scatname);
    mydata.append("catid",this.cat);
  this.myhttp.post("http://localhost:3000/api/managesubcat",mydata,{responseType:"text"}).subscribe((res:any)=>
  {
    this.msg=res;
  },
  (error)=>
  {
    this.msg=error;
  })
  }
  fetchsubcat(cat_id)
  {
    this.visibility=true;
    this.update=false;
    this.myhttp.get("http://localhost:3000/api/fetchsubcat?cid="+cat_id,{responseType:"json"}).subscribe((res:any[])=>
    {
      this.allsubcat=res;
    })  
  }
  onsubcatupdate(subcategory)
{
      this.visibility=true;
      this.update=true;
      this.delete=false;
      this.subcat=subcategory;
      this.scatname=subcategory.subcatname;
}
updatesubcat()
{
  var mydata=new FormData();
  if(this.myfile!=null)
    {
      mydata.append("photo",this.myfile);
    }
    mydata.append("scatname",this.scatname);
    mydata.append("catid",this.cat);
    mydata.append("oldpic",this.subcat.spic);
    mydata.append("subid",this.subcat._id);
    this.myhttp.put("http://localhost:3000/api/updatesubcat",mydata,{responseType:"text"}).subscribe((res)=>{
    alert(res);},
    (error)=>{
      alert(error);
    }) 
}
onsubcatdel(subcategory)
{
  var uresp=confirm("Are you sure you want to delete?");
  alert(subcategory.spic);
    if(uresp==true)
    {
      this.myhttp.delete("http://localhost:3000/api/delsubcat/?subid="+subcategory._id+"&subcatpic="+subcategory.spic,{responseType:"json"}).subscribe((res:any)=>
      {
        
        if(res.deletedCount==1)
        {
          alert("Category deleted successfully");
          this.fetchsubcat(this.cat);
        }
        else{
          alert("Category not deleted successfully");
        }
      },
      (error)=>
      {
        alert("error="+error);
      })
    }
}

}
