import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService extends DataService {
  constructor(http: Http) {
    super('http://localhost:3000/auth', http);
  }

  login(resource) {
    return this.http.post(this.url + '/login', resource)
        .map(response => {
          const result = response.json();
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          } else {
            return false;
          }
        });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');

    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  get currentUser() {
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    } else if (jwtHelper.isTokenExpired(token)) {
      return null;
    }

    return jwtHelper.decodeToken(token);
  }

}
