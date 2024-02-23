import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollingService {
  private scrollSubject = new Subject<void>();

  constructor() {}

  public getScrollSubject() {
    return this.scrollSubject;
  }

  public scrollToBottom() {
    this.scrollSubject.next();
  }
}
