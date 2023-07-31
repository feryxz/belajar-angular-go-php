import { HttpParams, HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import Swal from 'sweetalert2';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { MainService } from 'src/app/services/main.service';
// import { AesService } from 'src/app/services/aes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personalia-edit-modal',
  templateUrl: './personalia-edit-modal.component.html',
  styleUrls: ['./personalia-edit-modal.component.scss']
})
export class PersonaliaEditModalComponent {
  public Form: any;
  listStruktur: any = [];


  public listJenkel: any = [
    {
      "name": "Laki - Laki",
      "value": "L",
    },
    {
      "name": "Perempuan",
      "value": "P",
    },
  ];

  public listTipe: any = [
    {
      "name": "Email",
      "value": "email",
    },
    {
      "name": "Hp",
      "value": "hp",
    },
  ];

  public listAktif: any = [
    {
      "name": "Aktif",
      "value": "1",
    },
    {
      "name": "Tidak Aktif",
      "value": "0",
    },
  ];
  data: any;

  constructor(
    private router: Router,
    // private mainSrv: MainService,
    private http: HttpClient,
    public dialogService: DialogService,
    public getModal: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    // private aes: AesService,
    private messageSrv: MessageService,
  ) {
    // this.level = this.mainFrSrv.getLevel();
    // this.filter = {
    //   "name": "SEMUA",
    //   "value": "SEMUA",
    // }

    this.data = getModal.data;

    this.getStruktur();

    this.Form = this.formBuilder.group({
      personalia: [this.data.personalia, [Validators.required]],
      nip: [this.data.nip, [Validators.required]],
      jenkel: [this.data.jenkel, [Validators.required]],
      hp: [this.data.hp, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      idstruktur: [this.data.idstruktur.toString(), [Validators.required]],
      jabatan: [this.data.jabatan, [Validators.required]],
      password: [''],
      tipe: [this.data.tipe, [Validators.required]],
      akun_aktif: [this.data.akun_aktif.toString(), [Validators.required]],
    })
  }

  getStruktur() {

    let Header = new HttpHeaders();
    Header = Header.append('Authorization', 'this.mainSrv.getAuthorization()');

    // let requestid = this.mainSrv.getRequestID();
    // let requestkey = this.mainSrv.getRequestKey(requestid);

    let Data = new HttpParams();
    // Data = Data.append('requestid', requestid);
    // Data = Data.append('requestkey', requestkey);

    this.http.get(environment.apiUrl + 'personalia/personalia/get-struktur', { headers: Header, params: Data }).subscribe(

      callback => {
        let response = <any>callback;
        // console.log(response)
        if (response.success == true) {
          this.listStruktur = response.data;
        } else {
          // this.mainSrv.getNotification('Gagal', response.msg, 'error')
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

  onSave() {
    const Header = { headers: new HttpHeaders().set('Authorization', 'this.mainSrv.getAuthorization()') }
    let formData: FormData = new FormData()

    // let requestid = this.mainSrv.getRequestID();
    // let requestkey = this.mainSrv.getRequestKey(requestid);

    // formData.append('requestid', requestid);
    // formData.append('requestkey', requestkey);

    formData.append('idpersonalia', this.data.idpersonalia);
    formData.append('personalia', this.Form.get('personalia').value);
    formData.append('nip', this.Form.get('nip').value);
    formData.append('jenkel', this.Form.get('jenkel').value);
    formData.append('hp', this.Form.get('hp').value);
    formData.append('email', this.Form.get('email').value);
    formData.append('idstruktur', this.Form.get('idstruktur').value);
    formData.append('jabatan', this.Form.get('jabatan').value);
    // formData.append('password', this.aes.SHA512(this.Form.get('password').value));
    formData.append('tipe', this.Form.get('tipe').value);
    formData.append('akun_aktif', this.Form.get('akun_aktif').value);

    this.http.post(environment.apiUrl + 'personalia/personalia/edit', formData, Header).subscribe(
      callback => {

        let response = <any>callback;
        if (response.success) {

          this.messageSrv.add({ severity: 'success', summary: 'Berhasil', detail: response.msg });
          this.onClose();
        } else {
          this.messageSrv.add({ severity: 'error', summary: 'Error', detail: response.msg });
        }
        // console.log(callback)

      },
      (err: HttpErrorResponse) => {
        console.log(err)
      }//err
    );//http
  }

  onClose() {
    this.ref.close(false);
  }
}
