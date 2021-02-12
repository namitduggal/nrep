import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  allcat:any[];
  pname:string;
  visibility:boolean;
  untype:boolean=true;
  prod_name:string="";
  constructor(private myrouter:Router,private route:ActivatedRoute,private myhttp:HttpClient) {
    myrouter.events.subscribe(event=>{
      if(event instanceof NavigationEnd)
      {
        this.ngOnInit();
      }
    })
   }

  ngOnInit() {
    if(sessionStorage.getItem("nm")==null)
    {
      this.visibility=false;
      this.untype=true;
      this.pname="guest";
      
      this.fetchcategories();
    }
    else{
      if(sessionStorage.getItem("utype")=="common")
      {
      this.visibility=true;
      this.untype=true;
      this.pname=sessionStorage.getItem("nm");
      this.fetchcategories();
      }
      else if(sessionStorage.getItem("utype")=="admin")
      {
        this.visibility=true;
      this.untype=false;
      this.pname=sessionStorage.getItem("nm");
      }
    }
  }
  fetchcategories()
  {
    this.myhttp.get("https://ecommerce-webpage-try.herokuapp.com/api/fetchcat",{responseType:"json"}).subscribe((res:any[])=>
    {
      this.allcat=res;
    }) 
  }
  onsearch()
  {
    window.location.href="https://www.google.com/maps?q=jalandhar";
  }
  onsignout()
  {
    sessionStorage.clear();
    this.myrouter.navigateByUrl("/signout");
  }
}
