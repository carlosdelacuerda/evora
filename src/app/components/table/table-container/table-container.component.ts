import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { MaterialInterface } from 'src/app/interfaces/material.interface';
import { actionList } from 'src/app/state/actions/list.actions';
import { selectListSuccess } from 'src/app/state/selectors/list.selectors';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit {

  materialsList: MaterialInterface[] = [];
  browserAllowDB: boolean = true;

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.checkIndexedDB()
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
      const store = transaction.objectStore("materials");
      const dbMaterials = store.getAll();
      dbMaterials.onsuccess = () => {
        this.materialsList = dbMaterials.result;
        if (this.materialsList.length == 0) {
          this.getRemoteMaterials()
        }
      };
      transaction.oncomplete = () => {
        db.close();
      };
    }
  }

  getRemoteMaterials(){
    this.store.dispatch(actionList());
    this.store.select(selectListSuccess).pipe(
      take(2)
    )
    .subscribe(({materials}:any) => {
      this.materialsList = materials.d.PartSet.results;
      if (this.browserAllowDB && (this.materialsList.length > 0)) {
        this.createDB(this.materialsList)
      }
    });
  } 

}
