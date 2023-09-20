import { Component, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { pipe } from 'rxjs';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { FilterTextService } from 'src/app/services/filter.service';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [FilterTextService]
})
export class DetailComponent implements OnInit {

  material: MaterialInterface = {
    id: 0,
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

  materials: MaterialInterface[] = [
    this.material
  ];

  rowIndex: number = 0;

  filterTS:EventEmitter<any> = new EventEmitter

  constructor (
    public config: DynamicDialogConfig,
    private store: Store,
    public filterTextService: FilterTextService
    ) {}

  ngOnInit(): void {
    this.rowIndex = this.config.data;
    this.store.select(selectListSuccess).subscribe( pipe(({materials}:any) => {
      this.materials = materials;
      this.getMaterial()
    }))  
  }

  getMaterial() {
    this.material = this.materials.find((mat) => mat.id == this.rowIndex+1)!
  }

  navigateMaterial(newRowIndex:number) {
    this.filterTextService.emitResetInput()
    this.rowIndex = newRowIndex;
    this.getMaterial();
    this.config.header = this.material.DescTxt;
  }

}


