import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { ApiServiceService } from './service/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'estockmarket';
  companies: any = [];
  constructor(private api: ApiServiceService){
    setTheme('bs4');
    this.getCompanyDetails();
  }

  getCompanyDetails(){
    const requestUrl = 'info/all';
    this.api.getBaseURL(requestUrl).subscribe((result)=>{
      this.companies = result;
    })
  }
}
