import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from '../../components/table/book/book.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputNumber } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ListService } from '../../services/list.service'
import { ReactiveFormsModule } from '@angular/forms';


describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookComponent,
        InputNumber
      ],
      imports: [
        HttpClientTestingModule,
        ToastModule,
        ConfirmPopupModule,
        ButtonModule,
        ReactiveFormsModule
      ],
      providers: [
        ListService,
        provideMockStore({})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    });
    
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one input per form', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const inputElement = formElement.querySelectorAll('input');
    expect(inputElement[0]).toBeTruthy()
    expect(inputElement[1]).toBeFalsy()
  })

  it('should have void initial value', () => {
      const form = component.formGroup;
      const formValue = {
        amount: null
      }
      expect(form.value).toEqual(formValue)
  })

});
