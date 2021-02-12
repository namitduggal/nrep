import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
  nam:string;
  un:string;
  passw:string;
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
  }

  check()
  {
    if(sessionStorage.getItem("utype")!="admin")
    {
      alert("No Access addadmin");
      this.router.navigateByUrl("/login");
    }
  }
  onsignup(myform)
  {
    if(myform.valid)
    {
    var myparams={nm:this.nam,uname:this.un,pass:this.passw};
    this.myhttp.post("https://ecommerce-webpage-try.herokuapp.com/api/adminsignup",myparams,{responseType:"text"}).subscribe((res)=>
    {
      this.msg=res;
    });
  }
  else
  {
    this.msg="Invaild username/password";
  }
  }
}
