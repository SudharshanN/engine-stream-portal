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
  dataSource: MatTableDataSource<Material>;
  materialData: Material[] = [];

  columnsToDisplay = ['select', 'sno', 'materialNumber', 'materialDescription', 'engineType', 'plant', 'storageLocation', 'quantity', 'quantityOnHold', 'tsn', 'csn', 'condition', 'actions'];
  columnsToDisplayHeaders = {
    materialNumber: 'Material Number',
    materialDescription: 'Material Description',
    engineType: 'Engine Type',
    plant: 'Plant',
    quantity: 'Quantity',
    quantityOnHold: 'Quantity On Hold',
    storageLocation: 'Storage Location',
    tsn: 'TSN',
    csn: 'CSN',
    condition: 'Condition',
    actions: 'Actions'
  };
  innerDisplayedColumns = [
    'select', 'materialSerialNumber', 'batchNumber', 'qiBatchNumber', 'plant', 'storageLocation', 'ageByDay', 'quantity', 'quantityOnHold', 'surplusFlag', 'actions'
  ];
  outerColumnsHeaders = {
    materialSerialNumber: 'Material Serial Number',
    batchNumber: 'Batch Number',
    qiBatchNumber: 'Qi Batch Number',
    plant: 'Plant',
    quantity: 'Quantity',
    quantityOnHold: 'Quantity On Hold',
    storageLocation: 'Storage Location',
    ageByDay: 'Age By Day',
    surplusFlag: 'Surplus Flag',
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
    this.innerTables.
        forEach((table, index) => (table.dataSource as MatTableDataSource<BatchData>).
          sort = this.innerSort.toArray()[index]);
    console.log(event)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSalesHistory(event: Event) {
    event.stopPropagation();
  }
  getPartFullDetails(event: Event) {
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

export interface Material {
  materialNumber: string;
  materialDescription: string;
  engineType?: string;
  plant?: string;
  storageLocation?: string;
  quantity?: number;
  quantityOnHold?: number;
  tsn?: string,
  csn?: string;
  condition?: string;
  batches?: BatchData[] | MatTableDataSource<BatchData>;
}

export interface BatchData {
  materialSerialNumber: string;
  batchNumber: string;
  qiBatchNumber: string;
  plant?: string;
  storageLocation?: string;
  ageByDay?: string;
  quantity?: number;
  quantityOnHold?: number;
  surplusflag?: boolean;
}

export interface UserDataSource {
  materialNumber: string;
  materialDescription: string;
  engineType: string;
  plant?: string;
  storageLocation?: string;
  quantity?: number;
  quantityOnHold?: number;
  tsn?: string,
  csn?: string;
  condition?: string;
  batches?: MatTableDataSource<BatchData>;
}
const DATA: Material[] = [
  {
    materialNumber: "123456A",
    materialDescription: "# HPC FRONT SHAFT",
    engineType: "E-CFM56-7",
    plant: 'Test',
    storageLocation: 'India',
    quantity: 5,
    quantityOnHold: 2,
    tsn: '32DUS2233',
    csn: '112345222',
    condition: 'New',
    batches: [
      {
        materialSerialNumber: "WE234RDS",
        batchNumber: "78542",
        qiBatchNumber: "#RE10",
        plant: 'Test4',
        storageLocation: 'India'
      },
      {
        materialSerialNumber: "432WQA",
        batchNumber: "78554",
        qiBatchNumber: "# WE123",
        plant: 'test2',
        storageLocation: 'India'
      }
    ]
  },
  {
    materialNumber: "123456B",
    materialDescription: "# STG 1-2 SPOOL",
    engineType: "E-CFM56-7",
    plant: 'Test1',
    storageLocation: 'US',
    quantity: 15,
    quantityOnHold: 2,
    tsn: '32DUS4433',
    csn: '11XSD45222',
    condition: 'New',
  },
  {
    materialNumber: "123456C",
    materialDescription: "# HPT FRONT SHAFT",
    engineType: "E-CFM56-7",
    plant: 'Test3',
    storageLocation: 'EU',
    quantity: 10,
    quantityOnHold: 5,
    tsn: '32DUS4433',
    csn: '11XSD45222',
    condition: 'New',
    batches: [
      {
        materialSerialNumber: "12WEx",
        batchNumber: "23547",
        qiBatchNumber: "#023"
      },
      {
        materialSerialNumber: "AS001",
        batchNumber: "23451",
        qiBatchNumber: "#102EW"
      }
    ]
  }
];
