import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admallorders',
  templateUrl: './admallorders.component.html',
  styleUrls: ['./admallorders.component.css']
})
export class AdmallordersComponent implements OnInit {

  orders: any[];
  msg: string;
  status='';
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  ngOnInit() {
    //this.check();
    this.fetchcart();
  }

  check()
  {
    if(sessionStorage.getItem("utype")!="admin")
    {
      alert("No Access allorder");
      this.router.navigateByUrl("/login");
    }
  }
  fetchcart()
  {
    this.myhttp.get("https://ecommerce-webpage-try.herokuapp.com/api/fetchallorders",{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.orders=response;
          // for(let i =0; i != this.orders.length; i++) {
          //   this.status.push(this.orders[i].status);
          // }
        }
        else
        {
          this.msg="No details found";
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

}
