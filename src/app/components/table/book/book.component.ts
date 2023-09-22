import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription, first } from 'rxjs';
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
  openState$: Observable<any> = new Observable;
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
    }

  ngOnInit(): void {
    this.staticIndex = this.idMaterial;
    this.dynamicIndex = this.idMaterial;
    this.store.select(selectOpen)
    .subscribe((modal) => {
      this.openModal = !!modal;
      if(!modal) {
        this.getMaterial(this.staticIndex)
      }
    });
    this.rowIndex = this.store.select(selectNavigate)
    .subscribe((rowIndex:any) => {
      this.navigate(rowIndex)
    });
    this.getMaterial(this.idMaterial-1);
  }

  ngOnDestroy(): void {
    this.listMaterials.unsubscribe();
    this.rowIndex.unsubscribe();
  }

  getMaterial(index:number){
    this.listMaterials = this.store.select(selectListSuccess).pipe(first())
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
    if(!this.openModal) {
      this.material = this.materialsList[this.staticIndex-1]
    }
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
              this.getMaterial(index)
              this.messageService.add({ severity: 'info', summary: 'Booked', detail: 'Booked done' });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Booked canceled' });
          }
        });
    }
}