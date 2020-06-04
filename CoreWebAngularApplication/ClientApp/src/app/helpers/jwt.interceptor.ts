import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  readonly tokenKey = "access_token";
  constructor(private authenticationService: AuthService) { }
  

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && sessionStorage.hasOwnProperty(this.tokenKey)) {
      if (request.method != "GET") {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${sessionStorage.getItem(this.tokenKey)}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
