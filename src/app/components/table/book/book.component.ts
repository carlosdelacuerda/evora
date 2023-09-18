import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { actionStoreDBMaterials, actionUpdateData } from 'src/app/state/actions/list.actions';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

interface MaterialAmountInterface {
  amount: string
}
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
  };
  alertAmount: boolean = false;

  formGroup:any = FormGroup;

  constructor (
    public store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.select(selectListSuccess).subscribe( ({materials}:any) =>
      this.material = materials[this.rowIndex]
    );
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      amount: ['',
        [Validators.required, Validators.max(+this.material.Available)],
      ]
    });
  }

  book() {
    const amount = this.formGroup.value.amount;
    const req = indexedDB.open("MaterialsDatabase");
    req.onsuccess = () => {
      const db = req.result;
      const transaction = db.transaction("materials", "readwrite")
      const store = transaction.objectStore("materials");
      const request = store.get(this.rowIndex + 1)
      request.onerror = (event) => {
        alert()
      };
      request.onsuccess = (event) => {
        const data = request.result;
        data.Available = (+data.Available -amount).toString();
        data.Quantity = (+data.Quantity +amount).toString();
        const requestUpdate = store.put(data);
        requestUpdate.onerror = (event) => {
          alert('Book error')
        };
        requestUpdate.onsuccess = (event) =>{
          this.store.dispatch(actionUpdateData({material:data, index:this.rowIndex}))
          alert('Book success')
        };
      };

    }
  }
}