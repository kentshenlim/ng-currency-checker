import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ScrollingService } from './services/scrolling.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavigationBarComponent,
  ],
  template: `
    <div class="w-screen h-screen flex flex-col bg-MAIN">
      <section class="px-3 bg-sky-200/30 pt-3 pb-2">
        <app-header />
      </section>
      <section class="py-5 h-1 mt-4 flex-grow px-3 overflow-y-auto" #mainCanva>
        <router-outlet></router-outlet>
      </section>
      <section>
        <app-navigation-bar />
      </section>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('mainCanva') mainCanva!: ElementRef;
  private scrollSub!: Subscription;

  constructor(private scrollingService: ScrollingService) {}

  ngOnInit(): void {
    this.scrollSub = this.scrollingService.getScrollSubject().subscribe(() => {
      const el = this.mainCanva.nativeElement as HTMLElement;
      el.scrollTop = el.scrollHeight;
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
  }
}
