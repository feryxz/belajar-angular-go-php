import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

import { ComponentsRoutingModule } from './components-routing.module';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';

import { PersonaliaDataComponent } from './personalia-data/personalia-data.component';
import { PersonaliaDetailComponent } from './personalia-detail/personalia-detail.component';
import { PersonaliaAddModalComponent } from './personalia-data/personalia-add-modal/personalia-add-modal.component';
import { PersonaliaEditModalComponent } from './personalia-data/personalia-edit-modal/personalia-edit-modal.component';
import { PersonaliaDetailAkunComponent } from './personalia-detail-akun/personalia-detail-akun.component';
import { PersonaliaDetailLogComponent } from './personalia-detail-log/personalia-detail-log.component';
import { PersonaliaDetailDokumenComponent } from './personalia-detail-dokumen/personalia-detail-dokumen.component';


@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    PersonaliaDataComponent,
    PersonaliaDetailComponent,
    PersonaliaAddModalComponent,
    PersonaliaEditModalComponent,
    PersonaliaDetailAkunComponent,
    PersonaliaDetailLogComponent,
    PersonaliaDetailDokumenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsRoutingModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ToggleButtonModule,
    DynamicDialogModule,
    TooltipModule,
    TabViewModule,
    PasswordModule,
    ScrollPanelModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    PaginatorModule,
    DialogModule,
    CheckboxModule,
    ProgressBarModule,
    CalendarModule
  ],
  providers: [
    MessageService
  ]
})
export class ComponentsModule { }
