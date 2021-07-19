import {Component, Renderer2} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ExpenseModalComponent} from '../expense-modal/expense-modal.component';
import {ExpenseService} from '../expense.service';
import {
  addExpense,
  editExpense,
  loadExpenseList,
  removeExpense,
  stepBackward,
  stepForward,
  stepReset
} from '../flux/actions/expense.action';
import {saveReportForm} from '../flux/actions/reportForm.actions';
import {ExpenseEffects} from '../flux/effects/expense.effects';
import {ReportFormEffects} from '../flux/effects/reportForm.effects';
import {SubmitModalComponent} from '../submit-modal/submit-modal.component';

export interface Item {
  name: string;
  price: number;
  id: number;
  removal: boolean;
}

interface ClaimReportForm {
  fname: string,
  sname: string,
  bday: string,
  phoneNumber: string,
  email: string,
  policyNumber: string,
  date: string;
  description: string;
  address: string;
  country: string;
  radioTourism: string;
  radioSport: string;
  radioPhysical: string;
  radioStudy: string;
}

@Component({
  selector: 'app-claim-report',
  templateUrl: './claim-report.component.html',
  styleUrls: ['./claim-report.component.scss']
})
export class ClaimReportComponent {
  actualStep$: Observable<number>;

  form!: ClaimReportForm;
  items$: Observable<Item[]>;

  constructor(private dialog: MatDialog,
              private expensesService: ExpenseService,
              private expensesEffect: ExpenseEffects,
              private reportFormEffect: ReportFormEffects,
              private renderer2: Renderer2,
              private store: Store<{ step: number, list: Item[] }>) {
    this.initializeNewForm();
    this.actualStep$ = store.select('step');
    this.store.dispatch(loadExpenseList());
    // @ts-ignore
    this.items$ = store.select('expensesList');
    //todo: add animation of loading data
    this.reportFormEffect.saveResponse$.subscribe(() => {
      this.store.dispatch(stepReset({step: 1}));
      this.initializeNewForm();
    })
  }

  decreaseActualStep() {
    this.store.dispatch(stepBackward());
  }

  increaseActualStep(step: number, $event: Event) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.validateField(step) > 0) {
      return;
    }
    if (step === 3) {
      this.store.dispatch(saveReportForm({items: this.form}));
      this.store.dispatch(loadExpenseList())
      this.openConfirmModal()

    } else {
      this.store.dispatch(stepForward());
      setTimeout(() => {
        this.setFocusOnFirstElementOnStep(++step);
      }, 50);

    }
  }

  setActualStep(number: number): void {
    this.store.dispatch(stepReset({step: number}));
  }

  openModal() {
    const dialogRef = this.dialog.open(ExpenseModalComponent, {width: '35rem'});
    dialogRef.afterClosed().subscribe((res: Item) => {
      if (res) {
        if (!res.id) {
          //todo: skad wziac?
          // res.id = this.items.length + 1;
        }
        this.store.dispatch(addExpense({expense: res}));
      }
    })
  }

  openConfirmModal() {
    this.dialog.open(SubmitModalComponent, {width: '35rem'}).afterClosed().subscribe(() => {
      this.store.dispatch(stepReset({step: 1}));
      this.initializeNewForm();
    });
  }

  removeItem(item: Item) {
    const config: MatDialogConfig = {
      data: item,
      role: 'alertdialog',

    };

    const dialogRef = this.dialog.open(ExpenseModalComponent, config);
    dialogRef.afterClosed().pipe(filter(v => !!v)).subscribe((expenseId: number) => {
      this.store.dispatch(removeExpense({expenseId}));
    })
  }

  editItem(item: Item) {
    const config: MatDialogConfig = {
      data: item
    };

    const dialogRef = this.dialog.open(ExpenseModalComponent, config);
    dialogRef.afterClosed().pipe(filter(v => !!v)).subscribe((res: Item) => {
      this.store.dispatch(editExpense({expense: res}));
    })
  }

  private setFocusOnFirstElementOnStep(number: number): void {
    switch (number) {
      case(1):
        (document.getElementById('fname') as HTMLInputElement).focus();
        break;

      case(2):
        (document.getElementById('radioTourism') as HTMLInputElement).focus();
        break;

      case(3):
        (document.getElementById('submit') as HTMLButtonElement).focus();
        break;

      default:
        break;

    }
  }

  private validateField(step: number): number {
    let errorCounter = 0;
    if (step === 1) {

      this.form.fname = (document.getElementById('fname') as HTMLInputElement).value;
      this.form.sname = (document.getElementById('sname') as HTMLInputElement).value;
      this.form.bday = (document.getElementById('bday') as HTMLInputElement).value;
      this.form.phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value;
      this.form.email = (document.getElementById('email') as HTMLInputElement).value;
      this.form.policyNumber = (document.getElementById('policyNumber') as HTMLInputElement).value;
      errorCounter += this.checkField('policyNumber');
      errorCounter += this.checkField('email');
      errorCounter += this.checkField('phoneNumber');
      errorCounter += this.checkField('bday');
      errorCounter += this.checkField('sname');
      errorCounter += this.checkField('fname');
    }

    if (step === 2) {

      this.form.date = (document.getElementById('date') as HTMLInputElement).value;
      this.form.description = (document.getElementById('description') as HTMLInputElement).value;
      this.form.address = (document.getElementById('address') as HTMLInputElement).value;
      this.form.country = (document.getElementById('country') as HTMLInputElement).value;
      this.form.radioTourism = (document.getElementById('radioTourism') as HTMLInputElement).value;
      this.form.radioSport = (document.getElementById('radioSport') as HTMLInputElement).value;
      this.form.radioPhysical = (document.getElementById('radioPhysical') as HTMLInputElement).value;
      this.form.radioStudy = (document.getElementById('radioStudy') as HTMLInputElement).value;
      errorCounter += this.checkFieldSet();
      errorCounter += this.checkField('country');
      errorCounter += this.checkField('address');
      errorCounter += this.checkField('description');
      errorCounter += this.checkField('date');
    }

    return errorCounter;

  }

  private checkField(fieldName: string): number {
    // @ts-ignore
    if (!document.getElementById(`${fieldName}`).validity.valid) {
      debugger;
      document.getElementById(`${fieldName}_label`)?.classList.add('invalid');
      document.getElementById(`${fieldName}`)?.focus();
      // @ts-ignore
      if (document.getElementById(`${fieldName}`).validity.typeMismatch) {
        document.getElementById(`${fieldName}_label`)?.classList.add('wrong-input');
      } else {
        document.getElementById(`${fieldName}_label`)?.classList.remove('wrong-input');
      }
      return 1;
    } else {
      document.getElementById(`${fieldName}_label`)?.classList.remove('invalid');
      document.getElementById(`${fieldName}_label`)?.classList.remove('wrong-input');

      return 0;
    }
  }

  private checkFieldSet(): number {
    const fieldSetData = {
      radioTourism: (document.getElementById('radioTourism') as HTMLInputElement).checked,
      radioSport: (document.getElementById('radioSport') as HTMLInputElement).checked,
      radioPhysical: (document.getElementById('radioPhysical') as HTMLInputElement).checked,
      radioStudy: (document.getElementById('radioStudy') as HTMLInputElement).checked,
    }
    let sumAllElem = 0;
    sumAllElem += +fieldSetData.radioPhysical;
    sumAllElem += +fieldSetData.radioSport;
    sumAllElem += +fieldSetData.radioTourism;
    sumAllElem += +fieldSetData.radioStudy;

    const isInvalid = +(sumAllElem === 0);
    if (isInvalid) {
      document.getElementById(`purposeOfTravel`)?.classList.add('invalid');
    } else {
      document.getElementById(`purposeOfTravel`)?.classList.remove('invalid');
    }
    return isInvalid;
  }

  private initializeNewForm() {
    this.form = {
      ...this.form,
      fname: '',
      sname: '',
      bday: '',
      phoneNumber: '',
      email: '',
      policyNumber: '',
      date: '',
      description: '',
      address: '',
      country: '',
      radioTourism: '',
      radioSport: '',
      radioPhysical: '',
      radioStudy: '',
    };
  }

}
