import {createAction, props} from '@ngrx/store';
//todo: types
export const saveReportForm = createAction('[ClaimReport component] Save report form', props<{ items: any }>());
