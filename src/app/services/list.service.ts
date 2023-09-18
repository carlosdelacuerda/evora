import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialsListInterface } from '../interfaces/material.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    public http: HttpClient
  ) { }

  getAllMaterials() {
    return this.http.get<MaterialsListInterface>('../../assets/data/MatPricingSet.json');
  }


}
