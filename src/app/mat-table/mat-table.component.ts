import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient,private api:ApiServiceService) {}
  ngOnInit(): void {
    const ELEMENT_DATA: any[] = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];
    this.data = new MatTableDataSource<any>(ELEMENT_DATA);
    this.isLoadingResults = false;
  }

  getCompanyDetails(){
    let order = 'asc',page =1,sort='created';
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;
    this.api.getBaseURL(requestUrl).subscribe((result)=>{
      console.log(result.items,result.total_count);
      this.data = result.items;
      this.resultsLength = result.total_count;
      this.isLoadingResults = false;
    })
  }
}
