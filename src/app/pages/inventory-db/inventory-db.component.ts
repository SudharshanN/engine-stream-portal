import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BatchData, Material } from 'src/app/models/material.model';
import { BatchPartDialogComponent } from 'src/app/shared/components/batch-part-dialog/batch-part-dialog.component';
@Component({
  selector: 'iams-inventory-db',
  templateUrl: './inventory-db.component.html',
  styleUrls: ['./inventory-db.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class InventoryDbComponent implements OnInit, AfterViewInit {
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<BatchData>>;
  dataSource: MatTableDataSource<Material>;
  materialData: Material[] = [];

  columnsToDisplay = ['select', 'sno', 'materialNumber', 'materialDescription', 'engineType', 'plant', 'quantity', 'quantityOnHold', 'actions'];
  columnsToDisplayHeaders = {
    materialNumber: 'Material Number',
    materialDescription: 'Material Description',
    engineType: 'Engine Type',
    plant: 'Plant',
    quantity: 'Quantity',
    quantityOnHold: 'Quantity On Hold',
    actions: 'Actions'
  };
  innerDisplayedColumns = [
    'select', 'materialSerialNumber', 'batchNo', 'qiBatchNo', 'plant', 'storageLocation', 'ageByDay', 'quantity', 'quantityOnHold', 'surplusFlag', 'actions'
  ];
  outerColumnsHeaders = {
    materialSerialNumber: 'Material Serial Number',
    batchNo: 'Batch No',
    qiBatchNo: 'Qi Batch No',
    plant: 'Plant',
    quantity: 'Quantity',
    quantityOnHold: 'Quantity On Hold',
    storageLocation: 'Storage Location',
    ageByDay: 'Age By Day',
    surplusFlag: 'Surplus Flag',
    actions: 'Actions'
  }
  expandedElement: Material | null;
  products: any[];
  constructor(private cd: ChangeDetectorRef, public dialog: MatDialog, private router: Router, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.httpClient.get("assets/stub/material_stub.json").subscribe((data:Material[]) =>{
      console.log(data);
      this.products = data;
      this.products.forEach(material => {
        if (material.batches && Array.isArray(material.batches) && material.batches.length) {
          this.materialData = [...this.materialData, { ...material, batches: new MatTableDataSource(material.batches) }];
        } else {
          this.materialData = [...this.materialData, material];
        }
      });
      this.dataSource = new MatTableDataSource(this.materialData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  toggleRow(element: Material, event: Event) {
    console.log(element);
    console.log(this.dataSource.data);
    // element.isExpanded = true;
    
    element.batches && (element.batches as MatTableDataSource<BatchData>).data.length ? 
        (this.expandedElement = this.expandedElement === element ? null : element) : null;
      this.dataSource.data.forEach((data) => {
        if(data.materialNumber === element.materialNumber && this.expandedElement === element) {
          data.isExpanded = true;
        } else {
          data.isExpanded = false;
        }
      });
    this.cd.detectChanges();
    this.innerTables.
        forEach((table, index) => (table.dataSource as MatTableDataSource<BatchData>).
          sort = this.innerSort.toArray()[index]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSalesHistory(event: Event, element: Material) {
    // this.router.navigate(['/salesHistory'],{ queryParams: {materialNumber: element.materialNumber}});
    this.router.navigate(['/salesHistory', element.materialNumber]);
    event.stopPropagation();
  }
  getPartFullDetails(event: Event, element: BatchData) {
    console.log(element);
    this.router.navigate(['/batchDetails', element.materialSerialNumber]);
    event.stopPropagation();
  }
  getPartDetails(element: Material) {
    const dialogRef = this.dialog.open(BatchPartDialogComponent, {
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log('getPartDetails called');
  }
}

