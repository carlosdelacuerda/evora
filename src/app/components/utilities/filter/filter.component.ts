import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  value: string = '';
  @Output() filterMaterials = new EventEmitter<string>();

  constructor() {}

  filter() {
    this.filterMaterials.emit(this.value)
  }

}
