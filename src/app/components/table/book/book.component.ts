import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { FilterTextService } from 'src/app/services/filter.service';
import { ListService } from 'src/app/services/list.service';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';
import { selectNavigate, selectOpen } from 'src/app/state/selectors/navigate.selectors';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class BookComponent implements OnInit, OnDestroy {


  @Input() idMaterial: number = 0;
  rowIndex: Subscription = new Subscription;
  listMaterials: Subscription = new Subscription;
  openDialog: Subscription = new Subscription;
  material: undefined | MaterialInterface = {
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
  amount:any = FormControl;
  staticIndex: number = 0;
  dynamicIndex: number = 0;
  materialsList: MaterialInterface[] = []
  available: number = 0;
  openModal: boolean = false;

  constructor (
    public store: Store,
    private formBuilder: FormBuilder,
    public listService: ListService,
    private filterService: FilterTextService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService
    ) {
      this.filterService.$emitterResetInput.subscribe(() => {
        this.buildForm()
      });
      this.formGroup = this.formBuilder.group({});
      this.formGroup = new FormGroup({
        amount: new FormControl()
     });
    }

  ngOnInit(): void {
    this.staticIndex = this.idMaterial;
    this.dynamicIndex = this.idMaterial;
    this.openDialog = this.store.select(selectOpen)
    .subscribe((modal) => {
      this.openModal = !!modal;
      if(!modal) {
        this.getMaterial(this.staticIndex-1)
      }
    });
    this.rowIndex = this.store.select(selectNavigate)
    .subscribe((rowIndex:any) => {
      this.navigate(rowIndex)
    });
    this.getMaterial(this.idMaterial-1);
  }

  ngOnDestroy(): void {
    this.openDialog.unsubscribe()
    this.listMaterials.unsubscribe();
    this.rowIndex.unsubscribe();
  }

  getMaterial(index:number){
    this.listMaterials = this.store.select(selectListSuccess).pipe()
    .subscribe( ({materials}:any) => {
      this.materialsList = materials
      this.material = this.materialsList[index];
      this.buildForm();
    });
  }

  navigate(rowIndex:number){
      if(rowIndex){
        this.dynamicIndex = rowIndex+1
        this.getMaterial(rowIndex);
      }
  }

  buildForm() {
    this.material = this.openModal ?
    this.materialsList[this.dynamicIndex-1] : 
    this.materialsList[this.staticIndex-1]
    this.formGroup = this.formBuilder.group({
      amount: ['', [
        Validators.required,
        Validators.max(+(this.material?.Available)!),
        Validators.min(1)
      ]]
    });
  }

  book(event: Event) {
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Are you sure that you want to book?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              const index = this.openModal ? this.dynamicIndex : this.staticIndex;
              this.listService.bookMaterial(this.formGroup.value.amount, index);
              this.navigate(index-1)
              this.messageService.add({ severity: 'info', summary: 'Booked', detail: 'Booked done' });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Booked canceled' });
          }
        });
    }
}