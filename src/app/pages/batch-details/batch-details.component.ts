import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BatchPartDialogComponent } from 'src/app/shared/components/batch-part-dialog/batch-part-dialog.component';
import { batch_data_const } from 'src/app/constants/batch.const';

@Component({
  selector: 'iams-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss']
})
export class BatchDetailsComponent implements OnInit {
  material: any;
  batchDetails: any;
  label_batch = batch_data_const;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
   const materialSerialNumber = this.route.snapshot.paramMap.get('id');
   this.httpClient.get('assets/stub/material_stub.json').subscribe((data: []) => {
     console.log(data);
     this.material = data;
     this.material.forEach(m => {
      m.batches.forEach(element => {
        if (element.materialSerialNumber === materialSerialNumber){
          this.batchDetails = element;
        }
      });
    });

    });
  }
  toggleSurplus(batchDetails) {
    const dialogRef = this.dialog.open(BatchPartDialogComponent, {
      data: { ...batchDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log('getPartDetails called');
    this.batchDetails.surplusFlag = !this.batchDetails.surplusFlag;
  }

}
