import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { actionList } from 'src/app/state/actions/list.actions';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

  materialsList: MaterialInterface[] = []

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getRemoteMaterials()
  }

  getRemoteMaterials(){
    this.store.dispatch(actionList());
    this.store.select(selectListSuccess).pipe(
      take(2)
    )
    .subscribe(({materials}:any) => {
      this.materialsList =materials.d.PartSet.results;
    });
  }

}