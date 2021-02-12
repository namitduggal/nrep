import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-listofmembers',
  templateUrl: './listofmembers.component.html',
  styleUrls: ['./listofmembers.component.css']
})
export class ListofmembersComponent implements OnInit {

  msg:string;
  memlist:any[];
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() {
    //this.check();
    this.fetchmembers();
  }

  check()
  {
    if(sessionStorage.getItem("utype")!="admin")
    {
      alert("No Access list mem");
      this.router.navigateByUrl("/login");
    }
  }
  fetchmembers()
  {
    this.myhttp.get("https://ecommerce-webpage-try.herokuapp.com/api/listmembers",{responseType:"json"}).subscribe((res:any[])=>
    {
      if(res.length==0)
      {
        this.msg="NO MEMBERS FOUND";
      }
      else
      {
        this.memlist=res;
      }
    },
    (error)=>
    {
      this.msg=error;
    }
    )
    
  }
  onmemdel(memid)
  {
    var uresp=confirm("Are you sure you want to delete?");
    if(uresp==true)
    {
      this.myhttp.delete("https://ecommerce-webpage-try.herokuapp.com/api/deluser?id="+memid,{responseType:"json"}).subscribe((res:any)=>
      {
        if(res.deletedCount==1)
        {
          alert("member deleted successfully");
          this.fetchmembers();
        }
        else{
          alert("member not deleted successfully");
        }
      },
      (error)=>
      {
        this.msg=error;
      })
    }
  }

}

