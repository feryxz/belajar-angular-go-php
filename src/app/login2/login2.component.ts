import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss'],
  providers: [MessageService]
})
export class Login2Component {
  public Form: any;

  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageSrv: MessageService,
  ){
    this.Form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onLogin(){
    let formData: FormData = new FormData()
    formData.append('username', this.Form.get('username').value);
    formData.append('password', this.Form.get('password').value);

    this.http.post(environment.apiUrl + 'api/auth/login', formData).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {
          this.messageSrv.add({ severity: 'success', summary: 'Berhasil', detail: response.msg });
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          this.router.navigate(['/'])
        } else {
          this.messageSrv.add({ severity: 'error', summary: 'Error', detail: response.msg });
        }
      },
      (err: HttpErrorResponse) => {
        // this.loading = false;
        console.log(err)
      }
    );
  }
}
