import { Pipe, PipeTransform } from '@angular/core';
import { FilterMaterial } from '../interfaces/filter.interface';
import { MaterialInterface } from '../interfaces/material.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:FilterMaterial) {
    let materialsFiltered: MaterialInterface[] = []
    value.materials.forEach((material) => {
      if(
        material.DescTxt.toLowerCase()
        .includes(value.filter.toLowerCase())
        ){
        materialsFiltered.push(material)
      }
    })
    return materialsFiltered;
  }

}
