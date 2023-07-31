import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  public sideMenuItem: any = [];

  constructor(
    private router: Router
  ) {

    this.sideMenuItem = [
      {
        label: 'Dashboard',
        icon: 'pi-microsoft',
        link: 'dasboard'
      },
      {
        label: 'Product',
        icon: 'pi-list',
        link: 'dasboard'
      },
      //=================================
      {
        label: 'Component',
        icon: 'pi-refresh',
        items: [
          {
            label: 'Table',
            icon: 'pi-table',
            link: 'component/table'
          }, {
            label: 'Form',
            icon: 'pi-file-edit',
            link: 'component/form'
          },
          {
            label: 'Personalia',
            icon: 'pi-file-edit',
            link: 'component/personalia'
          },
          {
            label: 'Keanggotaan',
            icon: 'pi-list',
            link: 'component/keanggotaan'
          }
        ]
      }, {
        label: 'Setting',
        icon: 'pi-cog',
        link: 'setting'
      },


    ]
  }

  ngOnInit(): void {
  }

  onClick(id: any) {
    let element = document.getElementById(id);

    if (element?.className.includes('menu-item-open')) {
      element?.classList.remove('menu-item-open')
    } else {
      element?.classList.add('menu-item-open')
    }
  }

  getRoute() {
    return this.router.url
  }

}
