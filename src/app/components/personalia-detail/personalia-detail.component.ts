import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personalia-detail',
  templateUrl: './personalia-detail.component.html',
  styleUrls: ['./personalia-detail.component.scss']
})
export class PersonaliaDetailComponent {

  // public idpersonalia : any;

  // constructor(
  //   private route: ActivatedRoute
  //   ){
  //     this.idpersonalia = this.route.snapshot.paramMap.get('idpersonalia');
  //   }

  public Form: any;
  public updateForm: any;
  listStruktur: any = [];

  public idpersonalia : any;


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
    // public dialogService: DialogService,
    // public getModal: DynamicDialogConfig,
    // public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    // private aes: AesService,
    private messageSrv: MessageService,
    private route: ActivatedRoute
  ) {
    // this.level = this.mainFrSrv.getLevel();
    // this.filter = {
    //   "name": "SEMUA",
    //   "value": "SEMUA",
    // }
    this.idpersonalia = this.route.snapshot.paramMap.get('idpersonalia');

    // this.data = getModal.data;

    this.getStruktur();

    this.Form = this.formBuilder.group({
      id: ["", [Validators.required]],
      title: ["", [Validators.required]],
      price: ["", [Validators.required]],
      category: ["", [Validators.required]],
      description: ["", [Validators.required]],
      image: ["", [Validators.required]],
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

    this.http.get(environment.apiUrl + `api/products/get/${this.idpersonalia}`, { headers: Header, params: Data }).subscribe(

      (callback: any) => {
        let response = <any>callback;
        if (response.success == true) {
          this.data = response.data;
          this.updateForm = this.Form.patchValue({
            id: this.data.id,
            title: this.data.title,
            price: this.data.price,
            category: this.data.category,
            description: this.data.description,
            image: this.data.image
          })
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
    const Header = { headers: new HttpHeaders().set('Authorization', 'this.mainSrv.getAuthorization()') }
    let formData: FormData = new FormData()

    // let requestid = this.mainSrv.getRequestID();
    // let requestkey = this.mainSrv.getRequestKey(requestid);

    // formData.append('requestid', requestid);
    // formData.append('requestkey', requestkey);

    // formData.append('id', this.data.id);
    formData.append('id', this.Form.get('id').value);
    formData.append('title', this.Form.get('title').value);
    formData.append('price', this.Form.get('price').value);
    formData.append('category', this.Form.get('category').value);
    formData.append('description', this.Form.get('description').value);
    formData.append('image', this.Form.get('image').value);
    // formData.append('idstruktur', this.Form.get('idstruktur').value);
    // formData.append('jabatan', this.Form.get('jabatan').value);
    // // formData.append('password', this.aes.SHA512(this.Form.get('password').value));
    // formData.append('tipe', this.Form.get('tipe').value);
    // formData.append('akun_aktif', this.Form.get('akun_aktif').value);

    this.http.post(environment.apiUrl + 'api/products/put', formData, Header).subscribe(
      (callback: any) => {

        let response = <any>callback;
        if (response.success == true) {
          this.messageSrv.add({ severity: 'success', summary: 'Berhasil', detail: response.msg });
          console.log("ok");
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

  // onClose() {
  //   this.ref.close(false);
  // }

}
