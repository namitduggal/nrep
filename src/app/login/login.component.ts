import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname:string;
  pass:string;
  msg:string;
  url:string;
  constructor(private myrouter:Router,private myhttp:HttpClient) { }

  ngOnInit() {
  }
  onLogin()
  {
    var myparams={un:this.uname,passw:this.pass};
    this.myhttp.post("https://ecommerce-webpage-try.herokuapp.com/api/login",myparams,{responseType:"json"}).subscribe((res:any[])=>
    {
      if(res.length==0)
      {
        this.msg="Wrong username or password!!";
      }
      else
      {
      sessionStorage.setItem("nm",res[0].name);
      sessionStorage.setItem("uname",res[0].username);
      if(res[0].usertype=="common")
      {
        sessionStorage.setItem("utype",res[0].usertype);
      this.myrouter.navigateByUrl("/homepage");
      }
      else
      {
        sessionStorage.setItem("utype",res[0].usertype);
          this.myrouter.navigateByUrl("/adminpanel");
      }
    }
  })

  }
  onclick()
  {
    this.myrouter.navigateByUrl("/signup");
  }
}
