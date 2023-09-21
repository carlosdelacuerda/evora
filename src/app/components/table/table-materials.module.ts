import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list/table-list.component';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableContainerComponent } from './table-container/table-container.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DetailComponent } from './detail/detail.component';
import { BookComponent } from './book/book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from '../utilities/filter/filter.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    TableListComponent,
    TableContainerComponent,
    DetailComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    InputNumberModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule,
    ReactiveFormsModule,
    FilterModule,
    ConfirmPopupModule
  ],
  exports: [
    TableContainerComponent
  ]
})
export class TableMaterialsModule { }
