import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ExpenseService} from '../../expense.service';
import {loadExpenseListSuccess} from '../actions/expense.action';

@Injectable()
export class ExpenseEffects {

  @Effect()
  loadItems$ = this.actions$.pipe(ofType('[Expenses list/API] get expenses list'),
    mergeMap(() => {
      return this.expensesService.getExpensesList().pipe(
          map(expenses => (loadExpenseListSuccess({expenses})),
          catchError(() => EMPTY)
        ));
      }
    )
  );

  constructor(private actions$: Actions,
              private expensesService: ExpenseService) {
  }


}
