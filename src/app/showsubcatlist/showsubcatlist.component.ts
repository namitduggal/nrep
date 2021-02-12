import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showsubcatlist',
  templateUrl: './showsubcatlist.component.html',
  styleUrls: ['./showsubcatlist.component.css']
})
export class ShowsubcatlistComponent implements OnInit {

  cat:string;
  subcat:string;
  allsubcat:any[];
  msg:string="";
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() 
  {
    sessionStorage.setItem("url","showsubcategories");
    this.route.queryParams.subscribe(resp=>{
      this.cat=resp["catid"];
  });
  this.fetchsubcat();
  }
  fetchsubcat()
  {
    this.myhttp.get("https://ecommerce-webpage-try.herokuapp.com/api/fetchsubcat?cid="+this.cat,{responseType:"json"}).subscribe((res:any[])=>
    {
      if(res.length>0)
      {
      this.allsubcat=res;
      }
      else
      {
        this.msg="No Sub Categories";
      }
    },
    (error)=>
    {
      this.msg=error;
    })  
  }
}
