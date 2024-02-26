import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(dateStr: string, ...args: unknown[]): string {
    return formatDistanceToNow(dateStr) + ' ago';
  }
}
