import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public dataList:any = [];
  constructor(
    private http : HttpClient
  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData(){
    let Data = new HttpParams();
    Data = Data.append('idkaresidenan', '');

    this.http.get('https://jsonplaceholder.typicode.com/todos/', {params:Data}).subscribe(
      callback => {
        let response = <any>callback;
        this.dataList = response;
        console.log(callback)
      },
      err => {
        console.log('error')
      }
    )
  }

}
