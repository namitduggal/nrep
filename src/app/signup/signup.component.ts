import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    sessionStorage.setItem("url","homepage");
  }
  onsignup(myform)
  {
    if(myform.valid)
    {
    var myparams={nm:this.nam,uname:this.un,pass:this.passw};
    this.myhttp.post("https://ecommerce-webpage-try.herokuapp.com/api/signup",myparams,{responseType:"text"}).subscribe((res)=>
    {
      this.msg=res;
    });
    this.router.navigateByUrl("/login");
  }
  else
  {
    this.msg="invalid username/password";
  }
  }

}
