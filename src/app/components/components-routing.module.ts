import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { PersonaliaDataComponent } from './personalia-data/personalia-data.component';
import { PersonaliaDetailComponent } from './personalia-detail/personalia-detail.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'personalia',
    component: PersonaliaDataComponent
  },
  {
    path: 'detail/:idpersonalia',
    component: PersonaliaDetailComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
