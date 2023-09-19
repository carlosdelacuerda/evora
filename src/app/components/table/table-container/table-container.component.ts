import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { FilterMaterial } from 'src/app/interfaces/filter.interface';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { actionList, actionStoreDBMaterials } from 'src/app/state/actions/list.actions';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit, OnDestroy {

  materialsList: MaterialInterface[] = [];
  browserAllowDB: boolean = true;
  store$: Observable<MaterialInterface[]> = new Observable;
  subscription: Subscription = new Subscription;

  filterPipe = new FilterPipe()

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.checkIndexedDB()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  filter(e:string) {
    this.store.select(selectListSuccess).pipe(
      take(1)
    )
    .subscribe((res:any) => {    
      let objectFilter:FilterMaterial = {
        materials: res.materials,
        filter: e
      }
      this.materialsList = this.filterPipe.transform(objectFilter)
    })
  }

  checkIndexedDB() {
    this.browserAllowDB = !!(window.indexedDB);
    this.browserAllowDB ?
    this.getDBMaterials() :
    this.getRemoteMaterials();
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

  getDBMaterials() {
    const request = indexedDB.open("MaterialsDatabase");
    request.onsuccess = () => {
      let transaction;
      const db = request.result;
      try {
        transaction = db.transaction("materials", "readonly");
      } catch {
        this.getRemoteMaterials()
        return
      }  
      const storeDB = transaction.objectStore("materials");
      const dbMaterials = storeDB.getAll();
      dbMaterials.onsuccess = () => {
        this.materialsList = dbMaterials.result;
        const materialsDeconstruct = {material:[...this.materialsList]};
        (this.materialsList.length == 0) ?
        this.getRemoteMaterials() :
        this.store.dispatch(actionStoreDBMaterials(materialsDeconstruct))
      };
      transaction.oncomplete = () => {
        this.store$ = this.store.select(selectListSuccess)
        this.subscription = 
        this.store$.subscribe(({materials}:any) => {
          this.materialsList = materials;})
        db.close();
      };
    }
  }

  getRemoteMaterials(){
    this.store.dispatch(actionList());
    this.store$ = this.store.select(selectListSuccess)
    this.subscription = this.store$.subscribe(({materials}:any) => {
      this.materialsList = materials;
      if (this.browserAllowDB && (this.materialsList.length > 0)) {
        this.createDB(this.materialsList)
      }
    });
  } 

}
