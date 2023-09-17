import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() rowIndex: number = 0;
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

  constructor (
    public store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectListSuccess).subscribe( ({materials}:any) =>
      this.material = materials[this.rowIndex]
    )
  }

}
