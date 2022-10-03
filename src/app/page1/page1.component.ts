import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  displayedColumns: string[] = [
    'no', 'nama', 'email', 'umur', 'alamat'
  ];
  dataSource: any;

  constructor(
    private http: HttpClient,
    // private dialog: MatDialog,
  ) {
    this.getData()
  }

  ngOnInit(): void {
  }

  getData() {
    let Header = new HttpHeaders();
    Header = Header.append('Authorization', '');
    let Data = new HttpParams();

    this.http.get(environment.apiUrl + 'test/test/get', { headers: Header, params: Data }).subscribe(

      callback => {
        let response = <any>callback;
        if (response.success == true) {
          this.dataSource = new MatTableDataSource(response.data);
        } else {
          alert("GAGAL")
        }
      },//callback
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code ' + err.status + ', body was : ' + err.error);
        }
      }//err
    );//subscribe
  }

}
