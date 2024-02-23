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
    <div class="w-screen h-screen pt-4 flex flex-col bg-MAIN">
      <section class="px-3 mb-4">
        <app-header />
      </section>
      <section class="py-5 h-1 flex-grow px-3 overflow-y-auto" #mainCanva>
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
    });
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
  }
}
