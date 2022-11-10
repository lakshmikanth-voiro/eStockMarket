import {Component, ViewChild, OnInit, Input, SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
  @Input() data: any;
  displayedColumns: string[] = [];
  resultsLength = 0;
  tableData: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  min: number = 99999999999999;
  max: number = 0;
  avg?: number;
  constructor() {}
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'].currentValue) {
      this.displayedColumns= [];
      this.tableData={};
      if (this.data.stocksList) {
        this.data.stocksList.forEach((stock: any) => {
          delete stock['isDeleted']
        });
        this.min = this.data.minStockPrice;
        this.max = this.data.maxStockPrice;
        Object.keys(this.data.stocksList[0]).forEach(key => this.displayedColumns.push(key.toString()));
        this.tableData = new MatTableDataSource<any>(this.data.stocksList);
        this.resultsLength = this.data.stocksList.length;
        this.avg =  this.data.avg;
      }
    }
  }
}
