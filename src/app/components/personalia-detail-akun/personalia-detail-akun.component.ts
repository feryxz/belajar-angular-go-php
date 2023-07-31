import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalia-detail-akun',
  templateUrl: './personalia-detail-akun.component.html',
  styleUrls: ['./personalia-detail-akun.component.scss']
})
export class PersonaliaDetailAkunComponent implements OnInit {
  @Input() idpersonalia_akun : any

  constructor(){
    console.log(this.idpersonalia_akun) // undefined
  }

  ngOnInit(){
    console.log(this.idpersonalia_akun)
  }
}