import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'iams-batch-part-dialog',
  templateUrl: './batch-part-dialog.component.html',
  styleUrls: ['./batch-part-dialog.component.scss']
})
export class BatchPartDialogComponent implements OnInit {
  reason = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}

export interface DialogData {
  batchNumber: string;
  materialSerialNumber: string;
  surplusFlag: boolean;
}