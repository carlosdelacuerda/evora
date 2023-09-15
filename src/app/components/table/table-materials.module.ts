import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list/table-list.component';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableContainerComponent } from './table-container/table-container.component';

@NgModule({
  declarations: [
    TableListComponent,
    TableContainerComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    InputNumberModule,
    ButtonModule
  ],
  exports: [
    TableContainerComponent
  ]
})
export class TableMaterialsModule { }
