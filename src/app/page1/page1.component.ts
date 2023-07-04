import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
    private dialog: MatDialog,
    // private mainSrv: MainService,
    // private apiSrv: ApiService,
    private fb: FormBuilder,
    private router: Router,
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

  openAddDialog() {
    //fixing bug
    const dialogRef = this.dialog.open(UserAddDialog, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      if (result) {
        this.getData();
      }
    });
  }
}

//=========================================== ADD DIALOG ============================================
//===================================================================================================
@Component({
  selector: 'user-add-dialod',
  templateUrl: 'user-add-dialog.component.html',
  styleUrls: ['./page1.component.scss']
})
export class UserAddDialog {

  public res: any;
  Form: FormGroup;
  public isLoading: boolean;
  public AddFrom = false;
  public listKokab = [];
  public listKluster = [];
  public listLaz = [];
  public level: any;
  public user_level: any;

  constructor(
    private http: HttpClient,
    // private api: ApiService,
    private fb: FormBuilder,
    // private mainSrv: MainService,
    // private dp: DatePipe,
    public dialogRef: MatDialogRef<UserAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isLoading = false;

    this.Form = this.fb.group({
      nama: [],
      email: [],
      auth: [],
      level: [],
      kode_kokab: [],
      kode_laz: [],
      idkluster: [],
      otp: [],
    });
    // this.user_level = this.mainSrv.getLevel();
  }


  ngOnInit() {

  }

  getKokab() {
    let Header = new HttpHeaders();
    // Header = Header.append('Authorization', this.mainSrv.getAuthorization());

    let Data = new HttpParams();

    this.http.get(environment.apiUrl + 'master/kokab-get', { headers: Header, params: Data }).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {
          this.listKokab = response.data;
          this.getLaz();
        } else {
          alert(response.msg);
        }
      },//callback
      (err: HttpErrorResponse) => {
        console.log(err)
      }//err
    );//http
  }//getData

  getLaz() {
    let Header = new HttpHeaders();
    // Header = Header.append('Authorization', this.mainSrv.getAuthorization());

    let Data = new HttpParams();

    this.http.get(environment.apiUrl + 'master/laz-get', { headers: Header, params: Data }).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {
          this.listLaz = response.data;
        } else {
          alert(response.msg);
        }
      },//callback
      (err: HttpErrorResponse) => {
        console.log(err)
      }//err
    );//http
  }//getData

  getKluster() {
    let Header = new HttpHeaders();
    // Header = Header.append('Authorization', this.mainSrv.getAuthorization());

    let Data = new HttpParams();
    Data = Data.append('kode_kokab', this.Form.value.kode_kokab)
    this.http.get(environment.apiUrl + 'data/unit-getkluster', { headers: Header, params: Data }).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {
          this.listKluster = response.data;
        } else {
          alert(response.msg);
        }
      },//callback
      (err: HttpErrorResponse) => {
        console.log(err)
      }//err
    );//http
  }//getData

  onSendOTP() {
    this.isLoading = true;

    // const Header = { headers: new HttpHeaders().set('Authorization', this.mainSrv.getAuthorization()) };
    let formData: FormData = new FormData();

    this.http.post(environment.apiUrl + 'data/user-sendotp', formData).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {
          // this.mainSrv.success(response.msg);
          this.AddFrom = true;
          this.getKokab();
        } else {
          alert(response.msg);
        }
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        alert(err);
        this.isLoading = false;
        console.log(err);
      }//err
    );//http
  }

  onLevel() {
    this.level = this.Form.value.level;
  }

  onSimpan() {
    this.postData();
  }

  onBatal(): void {
    this.dialogRef.close();
  }

  postData() {
    this.isLoading = true;

    // const Header = { headers: new HttpHeaders().set('Authorization', this.mainSrv.getAuthorization()) };
    let formData: FormData = new FormData();

    formData.append('nama', this.Form.value.nama);
    formData.append('email', this.Form.value.email);
    formData.append('auth', this.Form.value.auth);
    formData.append('level', this.Form.value.level);
    formData.append('kode_kokab', this.Form.value.kode_kokab);
    formData.append('kode_laz', this.Form.value.kode_laz);
    formData.append('idkluster', this.Form.value.idkluster);
    formData.append('otp', this.Form.value.otp);
    //Data = Data.append('param', 'abc');
    this.http.post(environment.apiUrl + 'data/user-add', formData).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {
          this.res = response.msg;
          // this.mainSrv.success(this.res);
          this.dialogRef.close('true');
        } else {
          alert(response.msg);
        }
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        alert(err);
        this.isLoading = false;
        console.log(err);
      }//err
    );//http
  }
}
