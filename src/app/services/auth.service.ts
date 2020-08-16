import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

const api = environment.authAPI;

export interface IUser {
  token: string;
  user_display_name?: string;
  user_email?: string;
  user_nicename?: string;
  isLevel10?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private subject = new Subject<IUser | HttpErrorResponse>();
  private user: IUser;

  constructor(private http: HttpClient) { }

  /**
   * Get Observable to subscribe.
   * NOTE: the data can be IUser or HttpErrorResponse object
   * use instanceof to check which one is!
   */
  getObservable = () => this.subject.asObservable();

  /**
   * Get current user object stored in the service.
   */
  getUser = () => this.user;

  /**
   * Login in the user using username and password.
   * on success a token is given, it will be stored in localStorge!
   * @param username the wordpress username
   * @param password the password
   */
  login(username: string, password: string): void {
    this.http.post(api.concat('/token'), {
      username,
      password,
    }).toPromise().then((response: IUser) => {
      this.user = response;
      this.subject.next(response);
      this.saveData();

    }).catch((error: HttpErrorResponse) => {
      this.user = null;
      this.subject.next(error);
    });
  }

  /**
   * Clear and delete everything.
   * NOTE: the token may still be valid.
   */
  logout(): void {
    localStorage.clear();
    this.subject.next(null);
    this.user = null;
  }

  /**
   * Save current user object stored in the service.
   * Will be saved as key => value !
   */
  saveData(): void {
    Object.keys(this.user).forEach(key => {
      localStorage.setItem(key, this.user[key]);
    });
  }

  /**
   * Load user data and verfiy the token stored in localStorage.
   * if the token is valid keep load the data.
   * if it's invalid, performe a logout process basiclly delete everything.
   */
  loadData(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }
    // this is required, for the interceptor.
    this.user = {
      token
    };

    this.http.post(api.concat('/token/validate'), {}).subscribe(() => {
      // on success (valid token)
      const user: IUser = {
        token,
        user_display_name: localStorage.getItem('user_display_name'),
        user_email: localStorage.getItem('user_email'),
        user_nicename: localStorage.getItem('user_nicename'),
        isLevel10: Boolean(localStorage.getItem('isLevel10'))
      };

      this.user = user;
      this.subject.next(user);
    }, () => {
      // on error (invalid token)
      this.logout();
    });
  }
}
