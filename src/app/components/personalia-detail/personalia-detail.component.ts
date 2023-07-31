import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personalia-detail',
  templateUrl: './personalia-detail.component.html',
  styleUrls: ['./personalia-detail.component.scss']
})
export class PersonaliaDetailComponent {

  public idpersonalia : any; 

  constructor(
    private route: ActivatedRoute
    ){
      this.idpersonalia = this.route.snapshot.paramMap.get('idpersonalia');
    }

}
