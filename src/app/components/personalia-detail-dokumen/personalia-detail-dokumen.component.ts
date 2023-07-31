import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalia-detail-dokumen',
  templateUrl: './personalia-detail-dokumen.component.html',
  styleUrls: ['./personalia-detail-dokumen.component.scss']
})
export class PersonaliaDetailDokumenComponent implements OnInit {
  @Input() idpersonalia_dokumen : any

  ngOnInit(){
    console.log(this.idpersonalia_dokumen)
  }

}
