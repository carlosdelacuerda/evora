import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { ListService } from 'src/app/services/list.service';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() idMaterial: number = 0;
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
  };
  alertAmount: boolean = false;

  formGroup:any = FormGroup;

  constructor (
    public store: Store,
    private formBuilder: FormBuilder,
    public listService: ListService
  ) {}

  ngOnInit(): void {
    this.store.select(selectListSuccess).subscribe( ({materials}:any) =>
      this.material = materials[this.idMaterial-1]
    );
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      amount: ['', [
        Validators.required,
        Validators.max(+this.material.Available)!
      ]]
    });
  }

  book() {
    this.listService.bookMaterial(this.formGroup.value.amount, this.idMaterial)
  }
}