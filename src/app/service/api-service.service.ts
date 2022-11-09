import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient,
    private config: AppConfig) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json, text/plain'
  });

  getCompanyInfo(endPoint: string): Observable<any> {
    return this.http.get<any>(this.config.baseUrl + endPoint, { headers: this.headers });
  }

  getBaseURL(url: string): Observable<any> {
    return this.http.get<any>(this.config.baseUrl + url, { headers: this.headers });
  }

  postBaseURL(url: string, data: any) {
    return this.http.post<any>(this.config.baseUrl + url , data, { headers: this.headers });
  }

  patchBaseURL(url: string, id: string, data: any): Observable<any> {
    return this.http.patch<any>(this.config.baseUrl + url + id + '/', data, { headers: this.headers });
  }
}
