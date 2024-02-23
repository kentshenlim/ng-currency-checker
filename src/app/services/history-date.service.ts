import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryDateService {
  private monthMap = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  public getDateStrings(isMonthly: boolean) {
    const dateStrings: string[] = [];
    let date = new Date();
    date.setDate(15);
    for (let i = 0; i < 5; i++) {
      dateStrings.push(this.dateObjToGoodString(date));
      if (isMonthly) date.setMonth(date.getMonth() - 1);
      else date.setFullYear(date.getFullYear() - 1);
    }
    dateStrings.reverse();
    return dateStrings;
  }

  public dateStringToMonthString(dStr: string) {
    const monthIdx = new Date(dStr).getMonth();
    return this.monthMap[monthIdx];
  }

  public dateStringToYearString(dStr: string) {
    return new Date(dStr).getFullYear().toString();
  }

  private dateObjToGoodString(d: Date) {
    const year = d.getFullYear().toString();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
