import { environment } from '../environments/environment';
import { Injectable } from "@angular/core";


@Injectable()
export class AppConfig {
    gethost() {
        return environment.host;
    }
    
    public readonly baseUrl = this.gethost();
}
