import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormsComponent } from '../forms/forms.component';
import { ApiServiceService } from '../service/api-service.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Input() companies:any;
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null;
  model: NgbDateStruct | undefined;
  fromTime: Date = new Date();
  toTime: Date = new Date();
  selectedCompany?: any;
  from: any;
  to: any;
  constructor(private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public dialog: MatDialog,
    public api: ApiServiceService
    ) {
    this.fromTime.setHours(0,0,0,0);
    this.toTime.setHours(24,0,0,0);
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit(): void {
    this.selectedCompany = this.companies[21];
    this.companies.forEach((company: any) => {
      this.options.push(company.id.toString());
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

  isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  openDialog() {
    this.dialog.open(FormsComponent);
  }

  selectCompany(id: any){
    this.selectedCompany = this.companies.find((ele: any) => ele.id == id);
  }

  onDateSelect(date: any,from=false,timechange=false){
    if(!timechange){
      if(from){
        this.from =date;
        this.fromTime.setFullYear(date.year);
        this.fromTime.setMonth(date.month-1);
        this.fromTime.setDate(date.day);
      }else{
        this.to= date;
        this.toTime.setFullYear(date.year);
        this.toTime.setMonth(date.month-1);
        this.toTime.setDate(date.day);
      }
    }
    if(this.from && this.to){
     const requestUrl =  `info/${this.selectedCompany.id}/${this.fromTime.toISOString().substring(0, this.fromTime.toISOString().length - 8)}/${this.toTime.toISOString().substring(0, this.toTime.toISOString().length - 8)}`;
     this.api.getBaseURL(requestUrl).subscribe((result)=>{
      this.selectedCompany = result;
    })
    }
   
  }
}
