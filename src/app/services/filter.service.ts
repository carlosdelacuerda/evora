import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterTextService {

  $emitterFilter = new EventEmitter();
  $emitterResetInput = new EventEmitter();

  public emitFilter() {
    this.$emitterFilter.emit();
  } 

  public emitResetInput() {
    this.$emitterResetInput.emit();
  }
}
