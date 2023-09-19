import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { FilterTextService } from 'src/app/services/filter.service';
import { actionUpdateData } from 'src/app/state/actions/list.actions';
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
    public service: FilterTextService
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
    const amount = this.formGroup.value.amount;
    const req = indexedDB.open("MaterialsDatabase");
    req.onsuccess = () => {
      const db = req.result;
      const transaction = db.transaction("materials", "readwrite")
      const store = transaction.objectStore("materials");
      const request = store.get(this.idMaterial)
      request.onerror = () => {
        alert()
      };
      request.onsuccess = () => {
        const data = request.result;
        data.Available = (+data.Available -amount).toString();
        data.Quantity = (+data.Quantity +amount).toString();
        const requestUpdate = store.put(data);
        requestUpdate.onerror = () => {
          alert('Book error')
        };
        requestUpdate.onsuccess = () =>{
          this.store.dispatch(actionUpdateData({material:data, index:this.idMaterial-1}));
          alert('Book success');
          this.service.emitEvent()
        };
      };
    }
  }
}