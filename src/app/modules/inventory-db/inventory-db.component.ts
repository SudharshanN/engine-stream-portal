import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  sign: string = 'add';
  dataSource: MatTableDataSource<Material>;
  materialData: Material[] = [];
  columnsToDisplay = ['select', 'sno','materialNumber', 'materialDescription', 'engineType', 'actions'];
  columnsToDisplayHeaders = {
    materialNumber: 'Material Number', 
    materialDescription: 'Material Description',
    engineType: 'Engine Type',
    actions: 'Actions'
  };
  innerDisplayedColumns = ['select', 'materialSerialNumber', 'batchNumber', 'qiBatchNumber', 'actions'];
  outerColumnsHeaders = {
    materialSerialNumber: 'Material Serial Number',
    batchNumber: 'Batch Number',
    qiBatchNumber: 'Qi Batch Number',
    actions: 'Actions'
  }
  expandedElement: Material | null;

  constructor(private cd: ChangeDetectorRef, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    DATA.forEach(material => {
      if (material.batches && Array.isArray(material.batches) && material.batches.length) {
        this.materialData = [...this.materialData, { ...material, batches: new MatTableDataSource(material.batches) }];
      } else {
        this.materialData = [...this.materialData, material];
      }
    });
    this.dataSource = new MatTableDataSource(this.materialData);
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  toggleRow(element: Material, event: Event) {
    element.batches && (element.batches as MatTableDataSource<BatchData>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<BatchData>).
    sort = this.innerSort.toArray()[index]);
    if (this.sign === 'add') {
        this.sign = 'remove';
    } else {
        this.sign = 'add';
    }
    console.log(event)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSalesHistory(event: Event){
    event.stopPropagation();
  }
  getPartFullDetails(event: Event){
    event.stopPropagation();
  }
  getPartDetails(element: Material){
    const dialogRef = this.dialog.open(BatchPartDialogComponent,  {
      data: {...element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log('getPartDetails called');
  }
}

export interface Material {
  materialNumber: string;
  materialDescription: string;
  engineType: string;
  batches?: BatchData[] | MatTableDataSource<BatchData>;
}

export interface BatchData {
  materialSerialNumber: string;
  batchNumber: string;
  qiBatchNumber: string;
}

export interface UserDataSource {
  materialNumber: string;
  materialDescription: string;
  engineType: string;
  batches?: MatTableDataSource<BatchData>;
}
const DATA: Material[] = [
  {
    materialNumber: "Mason",
    materialDescription: "mason@test.com",
    engineType: "9864785214",
    batches: [
      {
        materialSerialNumber: "Street 1",
        batchNumber: "78542",
        qiBatchNumber: "Kansas"
      },
      {
        materialSerialNumber: "Street 2",
        batchNumber: "78554",
        qiBatchNumber: "Texas"
      }
    ]
  },
  {
    materialNumber: "Eugene",
    materialDescription: "eugene@test.com",
    engineType: "8786541234",
  },
  {
    materialNumber: "Jason",
    materialDescription: "jason@test.com",
    engineType: "7856452187",
    batches: [
      {
        materialSerialNumber: "Street 5",
        batchNumber: "23547",
        qiBatchNumber: "Utah"
      },
      {
        materialSerialNumber: "Street 5",
        batchNumber: "23547",
        qiBatchNumber: "Ohio"
      }
    ]
  }
];
