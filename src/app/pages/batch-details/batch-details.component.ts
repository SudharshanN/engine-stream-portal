import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class BatchDetailsComponent implements OnInit,  AfterViewInit {
  material: any;
  batchDetails: any;
  label_batch = batch_data_const;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit() {
    const materialSerialNumber = this.route.snapshot.paramMap.get('id');
    this.httpClient.get('assets/stub/material_stub.json').subscribe((data: []) => {
      this.material = data;
      let materialNumber = {};
      let materialDescription = ''
      this.material.forEach(m => {
        materialNumber = m;
       m.batches.forEach(element => {
         if (element.materialSerialNumber === materialSerialNumber){
           this.batchDetails = {...element , ...materialNumber};
         }
       });
     });
     console.log(this.batchDetails)
     });
  }
  toggleSurplus(batchDetails) {
    const data = {
      "materialSerialNumber" : batchDetails.materialSerialNumber,
      "storageLocation": batchDetails.storageLocation,
      "batchNo": batchDetails.batchNo,
      "quantity": batchDetails.quantity,
      "qiBatchNo": batchDetails.qiBatchNo,
      "condition": batchDetails.condition,
      "plant": batchDetails.plant,
      "surplusFlag": batchDetails.surplusFlag
    }
    const dialogRef = this.dialog.open(BatchPartDialogComponent, {
      data: { ...data }, height: "490px", width: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log('getPartDetails called');
    this.batchDetails.surplusFlag = !this.batchDetails.surplusFlag;
  }

}
