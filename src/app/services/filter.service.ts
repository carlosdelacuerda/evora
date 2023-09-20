import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterTextService {

  $emitter = new EventEmitter();

  public emitEvent() {
    this.$emitter.emit();
  } 

}
