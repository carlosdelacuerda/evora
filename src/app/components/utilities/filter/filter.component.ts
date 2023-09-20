import { Component, Output, EventEmitter } from '@angular/core';
import { FilterTextService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  value: string = '';
  @Output() filterMaterials = new EventEmitter<string>();

  constructor(service: FilterTextService) {
    service.$emitter.subscribe(() => {
      this.filter()
    });
  }

  filter() {
    this.filterMaterials.emit(this.value)
  }

}
