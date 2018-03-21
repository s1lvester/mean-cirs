import { AuthHttp } from 'angular2-jwt';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService extends DataService {

  constructor(http: AuthHttp) {
    super('http://localhost:3000/incident-admin', http);
  }

  getUnpublished() {
    return this.http.get(this.url + '/unpublished')
    .map(response => response.json())
    .catch(this.handleError);
  }

}
