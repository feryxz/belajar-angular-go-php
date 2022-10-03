import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path        : '',
    redirectTo  : 'card',
    pathMatch   : 'full',
  },
  {
    path      : 'card',
    component : CardComponent
  },
  {
    path      : 'table',
    component : TableComponent
  }
]


@NgModule({
  declarations: [
    CardComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule

  ]
})
export class ContohModule { }
