import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Item} from './claim-report/claim-report.component';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  getExpensesList(): Observable<Item[]> {
    return of([
      {
        id: 1,
        price: 35,
        name: 'very very very expensive',
        removal:true
      },
      {
        id: 2,
        price: 325,
        name: 'not so much expensive',
        removal:true
      },
      {
        id: 3,
        price: 335,
        name: 'cheap item',
        removal:true
      },
      {
        id: 4,
        price: 3,
        name: 'just an item',
        removal:true
      },
      {
        id: 5,
        price: 35,
        name: 'item',
        removal:true
      }
    ])
  }
}
