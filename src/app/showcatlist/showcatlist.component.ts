import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showcatlist',
  templateUrl: './showcatlist.component.html',
  styleUrls: ['./showcatlist.component.css']
})
export class ShowcatlistComponent implements OnInit {

  allcat:any[];
  constructor(private myrouter:Router,private route:ActivatedRoute,private myhttp:HttpClient) {
    myrouter.events.subscribe(event=>{
      if(event instanceof NavigationEnd)
      {
        this.ngOnInit();
      }
    })
   }

  ngOnInit() {
    sessionStorage.setItem("url","showcategories");
    this.fetchcategories();
    
  }
  fetchcategories()
  {
    this.myhttp.get("http://localhost:3000/api/fetchcat",{responseType:"json"}).subscribe((res:any[])=>
    {
      this.allcat=res;
    }) 
  }
}
