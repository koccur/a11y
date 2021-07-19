import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Item} from '../claim-report/claim-report.component';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss']
})
export class SubmitModalComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item,
              private dialog: MatDialogRef<SubmitModalComponent>) {
  }

  cancel() {
    this.dialog.close(null);

  }
}
