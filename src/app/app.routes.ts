import { Routes } from '@angular/router';
import { ConverterFormComponent } from './components/converter-form/converter-form.component';
import { HistoryComponent } from './components/history/history.component';
import { NewsComponent } from './components/news/news.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  {
    component: ConverterFormComponent,
    path: '',
    title: 'CC | Calculator',
  },
  {
    component: HistoryComponent,
    path: 'trend',
    title: 'CC | Trend',
  },
  {
    component: NewsComponent,
    path: 'news',
    title: 'CC | News',
  },
  {
    component: ErrorComponent,
    path: '**',
    title: 'CC | NOT FOUND',
  },
];
