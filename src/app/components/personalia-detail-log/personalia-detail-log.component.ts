import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personalia-detail-log',
  templateUrl: './personalia-detail-log.component.html',
  styleUrls: ['./personalia-detail-log.component.scss']
})
export class PersonaliaDetailLogComponent {
  @Input() idpersonalia : any

}
