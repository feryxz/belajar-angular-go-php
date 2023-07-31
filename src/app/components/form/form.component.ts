import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { DataService } from 'src/app/services/data.service'
// import { MainService } from 'src/app/services/main.service';
// import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public Form: any;
  public jenkelList: any
  public setuju = 0
  public loading = false
  visible_confirm = false;
  consfirm_message = "";
  listNegara = [
    {
      "name": "Indonesia",
      "value": "Indonesia"
    },
    {
      "name": "Singapura",
      "value": "Singapura"
    },
    {
      "name": "Malaysia",
      "value": "Malaysia"
    },
    {
      "name": "Thailand",
      "value": "Thailand"
    },
  ]

  public img_file: any = 'assets/images/not-found.png'
  public img_file_name: string = ''

  public any_file: any;
  public any_file_name: string = '';

  // loading file
  public uploadProgress: any;
  public uploadProgressPercent: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dataSrv: DataService,
    // private mainSrv: MainService,
    private http: HttpClient,
    private messageSrv: MessageService,
    // private uploadSrv: UploadService,
    private zone: NgZone,
  ) {
    this.jenkelList = this.dataSrv.getJenKel()

    this.Form = this.formBuilder.group({
      nama: ['', [Validators.required]],
      hp: ['', [Validators.required]],
      jenkel: ['L', [Validators.required]],
      aktif: ['0', [Validators.required]],
      keterangan: [''],
      informasi: [''],
      negara: [''],
      tanggal: [new Date(), [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  //Input Image
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
  //Input Image end

  //Input File
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
  //Input File end

  onSave() {
    this.loading = true;
    setInterval(() => { this.loading = false, this.messageSrv.add({ severity: 'success', summary: 'Berhasil', detail: "Berhasil tambah data" }); }, 3000)
  }

  onSaveFile() {


  }
}
