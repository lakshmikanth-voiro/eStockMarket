import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CacheService } from './cache.service'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

export enum Verbs {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

@Injectable()
export class HttpClientService {

    constructor(
        private http: HttpClient,
        private _cacheService: CacheService,
    ) { }

    get<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.GET, options)
    }

    delete<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.DELETE, options)
    }

    post<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.POST, options)
    }

    put<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.PUT, options)
    }

    private httpCall<T>(verb: Verbs, options: HttpOptions): Observable<T> {
        options.body = options.body || null;
        const data = this._cacheService.load(options.url);

        if (data !== null) {
            return of<T>(data);
        }

        let apiBody = {
            body: options.body
        };

        if (options.headers) {
            apiBody['headers'] = options.headers;
        }

        return this.http.request<T>(verb, options.url, apiBody).pipe(switchMap(response => {
            if (environment.cache) {
                this._cacheService.save({
                    key: options.url,
                    data: response
                });
            }
            return of<T>(response);
        }));
    }
}

export class HttpOptions {
    url: string;
    body?: any;
    headers?: HttpHeaders;
}
