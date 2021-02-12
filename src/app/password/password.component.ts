import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  cpass:string;
  newpass:string;
  cnewpass:string;
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
  onpasschange(myform)
  {
    if(myform.valid)
    {
    if(this.cnewpass==this.newpass)
    {
      var myparams={uname:sessionStorage.getItem("uname"),cpass:this.cpass,npass:this.newpass};
      this.myhttp.put("https://ecommerce-webpage-try.herokuapp.com/api/changepass",myparams,{responseType:"json"}).subscribe((res:any)=>
      {
        if(res.nModified==0)
        {
          this.msg="Current Password Incorrect";
        }
        else if(res.nModified==1)
        {
          this.msg="Password changed successfully";
        }
      },
      (error)=>
      {
        this.msg=error;
      });
    }
    else
    {
      this.msg="New passwords doesnot match";
    }
  }
  else
  {
    this.msg="Invalid Password Format";
  }
  this.clearitems();
}
  clearitems()
  {
    this.cpass="";
    this.newpass="";
    this.cnewpass="";
  }
}
