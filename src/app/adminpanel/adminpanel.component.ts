import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() {
    //this.check();
  }

  check()
  {
    if(sessionStorage.getItem("utype")!="admin")
    {
      alert("No Access adminpanel");
      this.router.navigateByUrl("/login");
    }
  }
}
