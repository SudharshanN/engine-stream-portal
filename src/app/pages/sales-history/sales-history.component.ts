import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  sno: number;
  date: string;
  ponumber: string;
  amount: number;
  quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, date: '2020-04-05', ponumber: '5A32QTR', amount: 42365454, quantity: 5},
  {sno: 2, date: '2020-05-01', ponumber: '5VA54FAS', amount: 15265247, quantity: 7},
  {sno: 3, date: '2020-05-11', ponumber: '5CAQ21343', amount: 12531467, quantity: 1},
  {sno: 4, date: '2020-08-05', ponumber: '5YDSJKLQ1', amount: 9556342, quantity: 4},
  {sno: 5, date: '2020-09-16', ponumber: '5TY7Q1BA0', amount: 82346315, quantity: 2}
];
@Component({
  selector: 'iams-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  materailNumber: string;
  displayedColumns: string[] = ['sno', 'date', 'ponumber', 'amount', 'quantity'];
  dataSource = ELEMENT_DATA;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.materailNumber = this.route.snapshot.paramMap.get('id');
  }
  backToInventory() : void {
    this.router.navigate(['']);
  }
}
