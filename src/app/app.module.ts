import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {MatDialogModule} from '@angular/material/dialog';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClaimReportComponent} from './claim-report/claim-report.component';
import {ExpenseEffects} from './flux/effects/expense.effects';
import {ReportFormEffects} from './flux/effects/reportForm.effects';
import {expensesListReducer, stepReducer} from './flux/reducers/expense.reducer';
import {InsuranceComponent} from './insurance/insurance.component';
import {ExpenseModalComponent} from './expense-modal/expense-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ClaimReportComponent,
    InsuranceComponent,
    ExpenseModalComponent,
    SubmitModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    FlexLayoutModule.withConfig({
      addFlexToParent: false
    }),
    StoreModule.forRoot({'step': stepReducer, 'expensesList': expensesListReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    EffectsModule.forRoot([ExpenseEffects, ReportFormEffects]),
    BrowserAnimationsModule,
    FormsModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
