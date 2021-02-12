import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admupdstatus',
  templateUrl: './admupdstatus.component.html',
  styleUrls: ['./admupdstatus.component.css']
})
export class AdmupdstatusComponent implements OnInit {
  oid:string;
  currst:string;
  nst:string="";
  msg:string;
  constructor(private route:ActivatedRoute,private router:Router,private myhttp:HttpClient) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
      })
  }

  
  ngOnInit() {
    //this.check();
    this.route.queryParams.subscribe(args => {
      this.oid = args.orderid;
      this.currst = args.st;
    })
  }
  check()
  {
    if(sessionStorage.getItem("utype")!="admin")
    {
      alert("No Access update");
      this.router.navigateByUrl("/login");
    }
  }
  updatestatus() {
    let vals={newstatus:this.nst,oid:this.oid};
    this.myhttp.put("https://ecommerce-webpage-try.herokuapp.com/api/updateStatus", vals, {responseType:"text"}).subscribe(
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
