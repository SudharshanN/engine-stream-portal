import { MatTableDataSource } from '@angular/material/table';

export interface Material {
    materialNumber: string;
    materialDescription: string;
    engineType?: string;
    plant?: string;
    storageLocation?: string;
    quantity?: number;
    quantityOnHold?: number;
    batches?: BatchData[] | MatTableDataSource<BatchData>;
    isExpanded?: boolean;
  }
  export interface BatchData {
    materialSerialNumber: string;
    batchNo: string;
    qiBatchNo: string;
    plant?: string;
    storageLocation?: string;
    ageByDay?: string;
    quantity?: number;
    quantityOnHold?: number;
    surplusflag?: boolean;
  }