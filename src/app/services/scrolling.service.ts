import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollingService {
  private scrollSubject = new Subject<void>();

  constructor() {}

  getScrollSubject() {
    return this.scrollSubject;
  }

  scrollToBottom() {
    this.scrollSubject.next();
  }
}
