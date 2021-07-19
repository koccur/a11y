import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ReportService} from '../../report.service';

@Injectable()
export class ReportFormEffects {

  saveResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[ClaimReport component] Save report form'),
      mergeMap(formData => this.formService.saveData(formData)
        .pipe(
          map(data => ({type: '[ReportForm API] data saved', payload: data})),
          catchError(() => of({type: '[ReportForm API] error during saving'}))
        )
      )
    )
  )

  constructor(private formService: ReportService,
              private actions$: Actions) {

  }
}
