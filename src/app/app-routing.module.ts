import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClaimReportComponent} from './claim-report/claim-report.component';
import {InsuranceComponent} from './insurance/insurance.component';

const routes: Routes = [
  {path: 'insurer', component: InsuranceComponent},
  {path: 'claim-report', component: ClaimReportComponent},
  {path: '', redirectTo: 'insurer', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
