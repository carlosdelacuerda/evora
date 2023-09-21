import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription, first } from 'rxjs';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { FilterTextService } from 'src/app/services/filter.service';
import { ListService } from 'src/app/services/list.service';
import { actionOpen } from 'src/app/state/actions/navigate.actions';
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
  saveIndex: number = 0;

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
    this.openState$ = this.store.select(selectOpen).pipe(
      first()
    )
    this.saveIndex = this.idMaterial;
    this.navigate();
    this.getMaterial();
  }

  ngOnDestroy(): void {
    this.listMaterials.unsubscribe();
    this.rowIndex.unsubscribe();
    this.store.dispatch(actionOpen({open:false}))
  }

  getMaterial(){
    this.listMaterials = this.store.select(selectListSuccess)
    .subscribe( ({materials}:any) =>
      this.material = materials[this.idMaterial-1]
    );
    this.buildForm();
  }

  navigate(){
    this.rowIndex = this.store.select(selectNavigate).subscribe(({rowIndex}:any) => {
      if(rowIndex){
        this.idMaterial = rowIndex+1;
        this.getMaterial();
      }
    });
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      amount: ['', [
        Validators.required,
        Validators.max(+this.material?.Available),
        Validators.min(1)
      ]]
    });
  }

  book(event: Event) {
      this.openState$.subscribe((modal) => {
        const id = modal ? this.idMaterial : this.saveIndex;
        console.log(this.idMaterial)
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Are you sure that you want to book?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.listService.bookMaterial(this.formGroup.value.amount, id);
              this.buildForm();
              this.messageService.add({ severity: 'info', summary: 'Booked', detail: 'Booked done' });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Booked canceled' });
          }
        });
      });
    }
}