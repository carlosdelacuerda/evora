import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  material: MaterialInterface = {
    Material: '',
    Quantity: '',
    DescTxt: '',
    CustomerPrice: '',
    CustomerCurrency: '',
    RepairPrice: '',
    RepairCurrency: '',
    Available: '',
    ExtUnit: '',
    MatStatus:'',
    StorageLoc: '',
    StorageLocDesc:'',
    NDFQuote: '',
    NDFCounter: '',
    TSPercentage: '',
    TSPercentageCounter:'' 
  }

  rowIndex: number = 0;

  constructor (
    public config: DynamicDialogConfig,
    private store: Store
    ) {}

  ngOnInit(): void {
    this.getMaterial()
  }

  getMaterial() {
    this.store.select(selectListSuccess).subscribe(
      x => console.log('detail', x)
    )
    this.material = this.config.data;
  }

}


