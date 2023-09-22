import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { DetailComponent } from '../detail/detail.component';
import { MessageService } from 'primeng/api';
import { actionNavigate, actionOpen } from 'src/app/state/actions/navigate.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class TableListComponent {

  ref: DynamicDialogRef | undefined;

  @Input() materialsList: MaterialInterface[] = []

  constructor(
    public dialogService: DialogService,
    public store: Store
    ) {}

  show(material:string, rowIndex:number) {
    this.store.dispatch(actionOpen({open:true}))
    this.store.dispatch(actionNavigate({rowIndex:rowIndex}))
    this.ref = this.dialogService.open(DetailComponent, {
      data: rowIndex,
      width: '70%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10,
      maximizable: true,
      header: material,
      showHeader: true,
      dismissableMask: true,
      styleClass: 'detail-modal'
    });
    this.ref.onDestroy.subscribe(() => {
      this.store.dispatch(actionOpen({open:false}))
    })
  }
}