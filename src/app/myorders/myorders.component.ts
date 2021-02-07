import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  orders: any[];
  msg: string;

  constructor(private myhttp: HttpClient) { }

  ngOnInit() {
    this.fetchcart();
  }

  fetchcart()
  {
    this.myhttp.get("http://localhost:3000/api/fetchorders?uname=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.orders=response;
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
