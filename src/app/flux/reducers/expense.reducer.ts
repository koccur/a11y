import {Action, createReducer, on} from '@ngrx/store';
import {Item} from '../../claim-report/claim-report.component';
import {
  addExpense,
  editExpense,
  loadExpenseListSuccess,
  removeExpense,
  stepBackward,
  stepForward, stepReset
} from '../actions/expense.action';

export const initialStepState = 3;

const _stepReducer = createReducer(
  initialStepState,
  on(stepForward, (state) => state + 1),
  on(stepBackward, (state) => state - 1),
  on(stepReset, (state,{step}) => state = step)
)

export const expensesListState: Item[] = [];

const _expensesListReducer = createReducer(
  expensesListState,
  on(addExpense, (state, {expense}) => [...state, expense]),
  on(removeExpense, (state, {expenseId}) => state.filter(elem => elem.id !== expenseId)),
  on(editExpense, (state, {expense}) =>
    [...state.filter(elem => elem.id !== expense.id), expense].sort((a, b) => a.id - b.id)),
  on(loadExpenseListSuccess, (state, {expenses}) => [...expenses])
)

export function stepReducer(state: number | undefined, action: Action): number {
  return _stepReducer(state, action);
}

export function expensesListReducer(state: Item[] | undefined, action: Action): Item[] {
  return _expensesListReducer(state, action);
}

