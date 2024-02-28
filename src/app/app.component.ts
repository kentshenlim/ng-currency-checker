import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ScrollUpButtonComponent } from './components/_common-ui/scroll-up-button/scroll-up-button.component';
import { ScrollingService } from './services/scrolling.service';
import { Subscription } from 'rxjs';
import { DecorativeBackgroundComponent } from './components/decorative-background/decorative-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavigationBarComponent,
    ScrollUpButtonComponent,
    DecorativeBackgroundComponent,
  ],
  template: `
    <div class="w-screen h-[100dvh] flex flex-col bg-MAIN max-w-3xl mx-auto">
      <section class="px-3 bg-sky-200/30 pt-3 pb-2 md:rounded-b-lg">
        <app-header />
      </section>
      <section
        class="py-5 h-1 flex-grow px-3 overflow-y-auto relative"
        #mainCanva
      >
        <router-outlet></router-outlet>
        <div class="fixed bottom-20 right-4" [class.hidden]="!isScrollUpShown">
          <app-scroll-up-button />
        </div>
      </section>
      <section>
        <app-navigation-bar />
      </section>
    </div>
    <app-decorative-background />
  `,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mainCanva') mainCanva!: ElementRef;
  private scrollSub!: Subscription;
  isScrollUpShown = false;
  updateScroll = this.updateScrollUpShown.bind(this);

  constructor(private scrollingService: ScrollingService) {}

  ngOnInit(): void {
    this.scrollSub = this.scrollingService
      .getScrollSubject()
      .subscribe((instruction) => {
        const el = this.mainCanva.nativeElement as HTMLElement;
        if (instruction === 'bottom') {
          el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        } else {
          el.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  ngAfterViewInit(): void {
    const el = this.mainCanva.nativeElement as HTMLElement;
    el.addEventListener('scroll', this.updateScroll);
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
    (this.mainCanva.nativeElement as HTMLElement).removeEventListener(
      'scroll',
      this.updateScroll
    );
  }

  private updateScrollUpShown() {
    const el = this.mainCanva.nativeElement as HTMLElement;
    this.isScrollUpShown = el.scrollTop > 200;
  }
}
