import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getJenKel() {
    let jenkel = [
      {
        "label": "Laki-laki",
        "value": "L",
      },
      {
        "label": "Perempuan",
        "value": "P",
      },
    ]

    return jenkel;
  }
}
