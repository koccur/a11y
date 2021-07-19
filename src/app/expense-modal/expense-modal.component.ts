import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Item} from '../claim-report/claim-report.component';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.scss']
})
export class ExpenseModalComponent implements AfterViewInit {
  dataPrice: number = 0;
  dataName: string = '';
  dataRemoval: boolean=false;
  dataId: number=0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item,
              private dialog: MatDialogRef<ExpenseModalComponent>) {

  }

  cancel() {
    this.dialog.close(null);
  }

  add() {
    const data: Item = {
      price: +this.dataPrice,
      name: this.dataName,
      id: this.dataId,
      removal:this.dataRemoval
    }
    this.dialog.close(data);
  }

  remove() {
    this.dialog.close(this.data.id);
  }

  ngAfterViewInit(): void {
    this.dataName = this.data?.name;
    this.dataPrice = this.data?.price;
    this.dataId = this.data?.id;
    this.dataRemoval = !!this.data?.removal;

  }

}
