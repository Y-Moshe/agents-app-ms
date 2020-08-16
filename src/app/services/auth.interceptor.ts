import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getUser()?.token;

    // attached the user token to any outgoing request if exists ofc
    const request = req.clone({
      headers: req.headers.set('Authorization', token ? 'Bearer ' + token : '')
    });

    return next.handle(request);
  }
}
