import { Component, Input } from '@angular/core';
import { MaterialInterface } from 'src/app/interfaces/material.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  @Input() material: MaterialInterface = {
    Material: '',
    Quantity: '',
    DescTxt: '',
    CustomerPrice: '',
    CustomerCurrency: '',
    RepairPrice: '',
    RepairCurrency: '',
    Available: '',
    ExtUnit: '',
    MatStatus: '',
    StorageLoc: '',
    StorageLocDesc: '',
    NDFQuote: '',
    NDFCounter: '',
    TSPercentage: '',
    TSPercentageCounter: ''
};

}
