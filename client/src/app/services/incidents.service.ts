
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IncidentsService extends DataService {

  constructor(http: Http) {
    super('http://localhost:3000/incident', http);
  }
}
