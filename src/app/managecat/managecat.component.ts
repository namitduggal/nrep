import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-managecat',
  templateUrl: './managecat.component.html',
  styleUrls: ['./managecat.component.css']
})
export class ManagecatComponent implements OnInit {

  catname:string;
  myfile:File;
  msg:string;
  visibility:boolean=false;
  cat:any;
  allcat:any[];
  update:boolean=false;
  delete:boolean=false;
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
      alert("No Access");
      this.router.navigateByUrl("/login");
    }
    this.fetchcategories();
  }
  fileselected(event)
  {
    this.myfile=event.target.files[0];
  }
  oncatadd()
  {
    var mydata=new FormData();
    if(this.myfile!=null)
    {
      mydata.append("photo",this.myfile);
    }
    mydata.append("catname",this.catname);
  this.myhttp.post("http://localhost:3000/api/addcat",mydata,{responseType:"text"}).subscribe((res:any)=>
  {
    this.msg=res;
  },
  (error)=>
  {
    this.msg=error;
  })
  }
  fetchcategories()
  {
    this.myhttp.get("http://localhost:3000/api/fetchcat",{responseType:"json"}).subscribe((res:any[])=>
    {
      if(res.length>0)
      {
        
        this.allcat=res;
      }
      else{
      }
    },
    (error)=>
    {
      this.msg=error;
    })
  }


oncatupdate(category)
{
      this.visibility=true;
      this.update=true;
      this.delete=false;
      this.cat=category;
      this.catname=this.cat.catname;
}
updatecat()
{
  var mydata=new FormData();
  if(this.myfile!=null)
    {
      mydata.append("photo",this.myfile);
    }
    mydata.append("cid",this.cat._id);
    mydata.append("oldpic",this.cat.catpic);
    mydata.append("cname",this.catname);
    this.myhttp.put("http://localhost:3000/api/updatecat",mydata,{responseType:"text"}).subscribe((res)=>{
    alert(res);},
    (error)=>{
      alert(error);
    }) 
}
oncatdel(category)
{
  var uresp=confirm("Are you sure you want to delete?");
    if(uresp==true)
    {
      this.myhttp.delete("http://localhost:3000/api/delcat/?cid="+category._id+"&catpic="+category.catpic,{responseType:"json"}).subscribe((res:any)=>
      {
        
        if(res.deletedCount==1)
        {
          alert("Category deleted successfully");
          this.fetchcategories();
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
