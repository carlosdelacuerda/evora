import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';
import { TableModule } from 'src/app/components/table/table.module';


@NgModule({
  declarations: [
    ListPage
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    TableModule
  ]
})
export class ListModule { }
