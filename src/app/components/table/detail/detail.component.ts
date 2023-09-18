import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { pipe } from 'rxjs';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  materials: MaterialInterface[] = [];

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
    this.rowIndex = this.config.data;
    this.store.select(selectListSuccess).subscribe( pipe(({materials}:any) => {
      this.materials = materials
      this.getMaterial()
    }))  
  }

  getMaterial() {
    this.material = this.materials[this.rowIndex]
  }

  navigateMaterial(newRowIndex:number) {
    this.rowIndex = newRowIndex;
    this.getMaterial()
  }

}


