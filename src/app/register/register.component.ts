import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {
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

  onRegister(){
    let formData: FormData = new FormData()
    formData.append('username', this.Form.get('username').value);
    formData.append('password', this.Form.get('password').value);

    this.http.post(environment.apiUrl + 'api/auth/signup', formData).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {
          this.messageSrv.add({ severity: 'success', summary: 'Berhasil', detail: response.msg });
          this.router.navigate(['/login'])
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
