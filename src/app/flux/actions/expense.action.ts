import {createAction, props} from '@ngrx/store';
import {Item} from '../../claim-report/claim-report.component';

export const stepForward = createAction('[ClaimReport component] step forward');
export const stepReset = createAction('[ClaimReport component] step reset', props<{step:number}>());
export const stepBackward = createAction('[ClaimReport component] step backward');
export const addExpense = createAction('[ClaimReport component] add expense', props<{ expense: Item }>());
export const removeExpense = createAction('[ClaimReport component] remove expense', props<{ expenseId: number }>());
export const editExpense = createAction('[ClaimReport component] edit expense', props<{ expense: Item }>());
export const loadExpenseList = createAction('[Expenses list/API] get expenses list');
export const loadExpenseListSuccess = createAction('[Expense API] Expense loaded success', props<{ expenses: Item[] }>());
export const loadExpenseListError = createAction('[Expense API] Expense loaded error');

