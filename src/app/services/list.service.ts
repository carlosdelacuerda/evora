import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialInterface, MaterialsListInterface } from '../interfaces/material.interface';
import { Store } from '@ngrx/store';
import { FilterTextService } from './filter.service';
import { actionUpdateData } from '../state/actions/list.actions';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    public http: HttpClient,
    public store: Store,
    public filterTextService: FilterTextService
  ) { }

  getAllMaterials() {
    return this.http.get<MaterialsListInterface>('../../assets/data/MatPricingSet.json');
  }

  bookMaterial(amountMaterial:string, idMaterial: number) {
    const amount = amountMaterial;
    const req = indexedDB.open("MaterialsDatabase");
    req.onsuccess = () => {
      const db = req.result;
      const transaction = db.transaction("materials", "readwrite")
      const store = transaction.objectStore("materials");
      const request = store.get(idMaterial)
      request.onerror = () => {
        alert('Request error')
      };
      request.onsuccess = () => {
        const data = request.result;
        data.Available = (+data.Available - (+amount)).toString();
        data.Quantity = (+data.Quantity +amount).toString();
        const requestUpdate = store.put(data);
        requestUpdate.onerror = () => {
          alert('Book error')
        };
        requestUpdate.onsuccess = () =>{
          this.store.dispatch(actionUpdateData({material:data, index:idMaterial-1}));
          this.filterTextService.emitFilter()
        };
      };
    }
  }

  createDB(materials:MaterialInterface[]) {
    indexedDB.deleteDatabase("MaterialsDatabase");
    const request = indexedDB.open("MaterialsDatabase", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("materials", { keyPath: "id", autoIncrement: true });
    };
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("materials", "readwrite");
      const store = transaction.objectStore("materials");
      materials.forEach((material) => {
        store.put(material)
      });
    };
  }
}
