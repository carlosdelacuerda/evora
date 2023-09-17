import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { DetailComponent } from '../detail/detail.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class TableListComponent {

  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService
    ) {}

  @Input() materialsList: MaterialInterface[] = []

  show(material:string, rowIndex:number) {
    this.ref = this.dialogService.open(DetailComponent, {
      data: rowIndex,
      width: '70%',
      height: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10,
      maximizable: true,
      header: material,
      showHeader: true,
      dismissableMask: true,
      styleClass: 'detail-modal'
    });
  }

}