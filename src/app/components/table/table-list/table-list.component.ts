import { Component, Input } from '@angular/core';

import { MaterialInterface } from 'src/app/interfaces/material.interface';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {

  @Input() materialsList: MaterialInterface[] = []

}