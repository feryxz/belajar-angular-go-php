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
  selector: 'app-personalia-add-modal',
  templateUrl: './personalia-add-modal.component.html',
  styleUrls: ['./personalia-add-modal.component.scss']
})
export class PersonaliaAddModalComponent {
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

  loading = false;

  public img_file: any = 'assets/images/not-found.png'
  public img_file_name: string = ''

  public any_file: any;
  public any_file_name: string = '';

  // loading file
  public uploadProgress: any;
  public uploadProgressPercent: any = 0;

  constructor(
    private router: Router,
    // private mainSrv: MainService,
    private http: HttpClient,
    public dialogService: DialogService,
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
    this.getStruktur();

    this.Form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      // idstruktur: ['', [Validators.required]],
      // jabatan: ['1', [Validators.required]],
      // password: ['', [Validators.required]],
      // tipe: ['email', [Validators.required]],
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

    this.http.get(environment.apiUrl + 'api/products/get', { headers: Header, params: Data }).subscribe(

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

  onImgHandled(event: any) {
    if (event.target.files && event.target.files[0]) {
      let mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        alert('Only image supported')
        return
      }
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files.item(0));
      reader.onload = () => {
        this.img_file = reader.result;
        this.img_file_name = event.target.files[0].name;
        this.Form.get('image').setValue(event.target.files[0]);
      }
    }
  }

  onImgDragOver(event: any) {
    event.preventDefault();
  }

  onImgDropped(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.img_file = reader.result;
      this.img_file_name = files[0].name;
    }
  }

  onFileHandled(event: any) {
    if (event.target.files && event.target.files[0]) {
      let mimeType = event.target.files[0].type;
      // if (mimeType.match(/image\/*/) == null) {
      //   alert('File not supported')
      //   return
      // }
      this.any_file = event.target.files.item(0);
      this.any_file_name = event.target.files[0].name;
    }
  }

  onFileDragOver(event: any) {
    event.preventDefault();
  }

  onFileDropped(event: any) {
    event.preventDefault();
    this.any_file = event.dataTransfer.files[0];
    this.any_file_name = event.dataTransfer.files[0].name;
  }

  onSave() {

    this.loading = true;
    const Header = { headers: new HttpHeaders().set('Authorization', 'this.mainSrv.getAuthorization()') }
    let formData: FormData = new FormData()

    // let requestid = this.mainSrv.getRequestID();
    // let requestkey = this.mainSrv.getRequestKey(requestid);

    // formData.append('requestid', requestid);
    // formData.append('requestkey', requestkey);

    formData.append('title', this.Form.get('title').value);
    formData.append('price', this.Form.get('price').value);
    formData.append('category', this.Form.get('category').value);
    formData.append('description', this.Form.get('description').value);
    // formData.append('image', this.img_file);
    formData.append('image', this.Form.get('image').value);


    console.log(formData.append('description', this.Form.get('description').value));
    console.log(formData.append('image', this.img_file_name));
    // console.log(this.img_file);
    console.log(typeof(this.img_file_name));
    // console.log(formData.append('image', this.Form.get('image').value));
    // formData.append('idstruktur', this.Form.get('idstruktur').value);
    // formData.append('jabatan', this.Form.get('jabatan').value);
    // formData.append('password', this.aes.SHA512(this.Form.get('password').value));
    // formData.append('tipe', this.Form.get('tipe').value);

    this.http.post(environment.apiUrl + 'api/products/post', formData, Header).subscribe(
      callback => {
        let response = <any>callback;
        if (response.success == true) {

          this.messageSrv.add({ severity: 'success', summary: 'Berhasil', detail: response.msg });
          this.onClose();
        } else {
          this.messageSrv.add({ severity: 'error', summary: 'Error', detail: response.msg });
        }
        // console.log(callback)
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        console.log(err)
      }//err
    );//http
  }

  onClose() {
    this.ref.close(false);
  }
}
