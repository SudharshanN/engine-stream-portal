import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'iams-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss']
})
export class BatchDetailsComponent implements OnInit {
  material: any;
  batchDetails: any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

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

}
