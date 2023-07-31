import { Component, ViewChild } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PersonaliaAddModalComponent } from './personalia-add-modal/personalia-add-modal.component'
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
// import { MainService } from 'src/app/services/main.service';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-personalia-data',
  templateUrl: './personalia-data.component.html',
  styleUrls: ['./personalia-data.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PersonaliaDataComponent {

  public dataList = [];
  public filterList = [];
  public isFilter = false;
  ref: DynamicDialogRef | undefined;
  public visible_confirm = false;
  public visible_detail = false;

  //pagination
  public page = 1;
  public rows = 20;
  public length = 0;
  public data_perpage = 20;
  constructor(
    private http: HttpClient,
    public dialog: DialogService,
    // private mainSrv: MainService,
    private confirmationService: ConfirmationService,
    private messageSrv: MessageService
  ) {
    this.getData()
  }

  getData() {
    let Header = new HttpHeaders();
    Header = Header.append('Authorization', 'this.mainSrv.getAuthorization()');

    let Data = new HttpParams();
    // Data = Data.append('keyword', '');

    //pagination
    Data = Data.append('page', String(this.page));
    Data = Data.append('data_perpage', String(this.data_perpage));

    this.http.get(environment.apiUrl + 'personalia/personalia/get', { headers: Header, params: Data }).subscribe({
      next: (callback) => {
        let response = <any>callback;
        if (response.success) {
          this.dataList = response.data;
          this.length = response.length;
        } else {
          // this.mainSrv.alert(response.msg);
        }
      },//callback
      error: (err: HttpErrorResponse) => {
        // this.mainSrv.alert(this.mainSrv.httpErrorMsg(err.status));
      }//err
    });//subscribe
  }//getData

  onOpenAddDialog() {
    this.ref = this.dialog.open(PersonaliaAddModalComponent, {
      header: 'Tambah Data',
      width: '90%',                                         // responsive
      style: { 'max-width': '600px', 'min-width': '400px' },  // responsive
      baseZIndex: 10000,
      dismissableMask: true,
    });

    this.ref.onClose.subscribe((result) => {
      this.getData();
    });
  }

  onFotoDialog() {
    this.visible_detail = true;
  }

  onPageChange(events: any) {
    this.page = events.page + 1;
    this.data_perpage = events.rows;
    this.getData()
  }

  onAlertInfo() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageSrv.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type: any) => {
        this.visible_confirm = true;
        // switch (type) {
        //   case ConfirmEventType.REJECT:
        //     this.messageSrv.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        //     break;
        //   case ConfirmEventType.CANCEL:
        //     this.messageSrv.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
        //     break;

        // }
      }
    });
  }

  onConfirm(param: any) {
    // console.log(param)
    this.confirmationService.confirm({
      message: 'Data Akan Terhapus, Apakah Anda Yakin Ingin Menghapus Ini?',
      accept: () => {
        this.messageSrv.add({ severity: 'success', summary: 'Success', detail: 'Berhasil Menghapus Data' });
        //Actual logic to perform a confirmation
        // this.onDelete(param);
      },
      reject: (type: any) => {
        // switch (type) {
        //   case ConfirmEventType.REJECT:
        //     this.messageSrv.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        //     break;
        //   case ConfirmEventType.CANCEL:
        //     this.messageSrv.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
        //     break;

        // }
      }
    });
  }

  onDelete(item: any) {
    const Header = { headers: new HttpHeaders().set('Authorization', 'this.mainSrv.getAuthorization()') };

    let Data = new HttpParams();

    Data = Data.append('idpersonalia', item.idpersonalia);

    this.http.post(environment.apiUrl + 'personalia/personalia/delete', Data, Header).subscribe({
      next: (callback) => {
        let response = <any>callback;
        if (response.success == true) {
          this.messageSrv.add({ severity: 'success', summary: 'Success', detail: response.msg });
          this.getData();
        } else {
          this.messageSrv.add({ severity: 'error', summary: 'Upps!', detail: response.msg });
          // alert(response.msg);
        }
      },//callback
      error: (err: HttpErrorResponse) => {
        this.messageSrv.add({ severity: 'error', summary: 'Upps!', detail: err.error.message });
      }//err
    });//subscribe

    // this.http.post(environment.apiUrl + 'personalia/personalia/delete', Data, Header).subscribe(
    //   callback => {
    //     let response = <any>callback;
    //     if (response.success == true) {
    //       // this.mainSrv.Swal("success", response.msg);
    //       this.messageSrv.add({ severity: 'success', summary: 'Success', detail: response.msg });
    //       this.getData();
    //     } else {
    //       // this.mainSrv.Swal("info", response.msg);
    //       this.messageSrv.add({ severity: 'error', summary: 'Upps!', detail: response.msg });
    //       // alert(response.msg);
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err);
    //   }//err
    // );//http
  }//deleteData
}
