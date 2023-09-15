import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';
import { TableMaterialsModule } from 'src/app/components/table/table-materials.module';

@NgModule({
  declarations: [
    ListPage
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    TableMaterialsModule
  ]
})
export class ListModule { }
