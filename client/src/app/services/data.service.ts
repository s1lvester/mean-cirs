
import { AuthHttp } from 'angular2-jwt';
import { AppComponent } from './../app.component';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(
    protected url: string,
    protected http
  ) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  get(id) {
    return this.http.get(this.url + '/' + id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(resource) {
    return this.http.put(this.url + '/' + resource.id, resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(resource) {
    return this.http.post(this.url, resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  protected handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    return Observable.throw(new AppError(error));
  }
}
