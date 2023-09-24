import { ListService } from 'src/app/services/list.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialInterface, MaterialsListInterface } from 'src/app/interfaces/material.interface';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

const materialsList: MaterialInterface[] = [
    {
        id: 1,
        Material: '6396734',
        Quantity: '2',
        DescTxt: 'Material 1',
        CustomerPrice: '40000.000',
        CustomerCurrency: 'EUR',
        RepairPrice: '9592.000',
        RepairCurrency: 'EUR',
        Available: '16093',
        ExtUnit: 'ST',
        MatStatus: '',
        StorageLoc: "1000",
        StorageLocDesc: "10032476",
        NDFQuote: "002",
        NDFCounter: "000001",
        TSPercentage: "016",
        TSPercentageCounter: "000001"
      },
      {
        id: 2,
        Material: "6396734",
        Quantity: "2",
        DescTxt: "Material 2",
        CustomerPrice: "40000.000",
        CustomerCurrency: "EUR",
        RepairPrice: "9592.000",
        RepairCurrency: "EUR",
        Available: "2994",
        ExtUnit: "ST",
        MatStatus: "",
        StorageLoc: "1100",
        StorageLocDesc: "10032508",
        NDFQuote: "002",
        NDFCounter: "000001",
        TSPercentage: "016",
        TSPercentageCounter: "000001"
      },
      {
        id: 3,
        Material: "6396734",
        Quantity: "2",
        DescTxt: "Material 3",
        CustomerPrice: "40000.000",
        CustomerCurrency: "EUR",
        RepairPrice: "9592.000",
        RepairCurrency: "EUR",
        Available: "998",
        ExtUnit: "ST",
        MatStatus: "",
        StorageLoc: "1200",
        StorageLocDesc: "10032550",
        NDFQuote: "002",
        NDFCounter: "000001",
        TSPercentage: "016",
        TSPercentageCounter: "000001"
      }
];

describe('ListService', () => {

    let service: ListService;
    let httpMock : HttpTestingController;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                [provideMockStore({})],
                ListService,
                StoreModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
        service = TestBed.inject(ListService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    afterAll( () => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('shoud get the remote list of materials', () => {
        const result =service.getAllMaterials().subscribe((resp: MaterialsListInterface) => {
            expect(resp.d.PartSet.results).toEqual(materialsList);
        });
        const req = httpMock.expectOne('../../../assets/data/MatPricingSet.json');
        expect(req.request.method).toBe('GET');
        req.flush(materialsList);
    });
/*
    it('getBooksFromCart return empty array when localStorage is empty', () => {
        const materials = service.getAllMaterials();
        conso
        materials.subscribe((res) => {
            expect(res.d.PartSet.results.length).toBe(0);
        })
    });


    it('addBookToCart add a book successfully when the list does not exist in the localStorage', () => {
        const toast = {
            fire: () => null
        } as any;
        const spy1 = spyOn(swal, 'mixin').and.callFake( () => {
            return toast;
        });
        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
        service.addBookToCart(book);
        listBook = service.getBooksFromCart();
        service.addBookToCart(book);
        expect(spy1).toHaveBeenCalled();
    });


    it('removeBooksFromCart removes the list from the localStorage', () => {
        service.addBookToCart(book);
        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);
        service.removeBooksFromCart();
        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });

*/
});