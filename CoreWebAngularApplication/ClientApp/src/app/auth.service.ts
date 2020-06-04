import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginUser } from './models/login.user';
import { User } from './models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private urlToken = "/token";
  private urlRegister = "/register";
  private urlAntiForgery = "/antiforgery"; 
  readonly tokenKey = "access_token";
  readonly loginKey = "userlogin";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  loginUser: User;

  constructor(private http: HttpClient) {
    //if (sessionStorage.getItem(this.loginKey)) {
      //this.loginUser = new User(JSON.parse(sessionStorage.getItem(this.loginKey)));
    //}
    //else {
    //  this.loginUser = null;
    //}
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem(this.loginKey)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(registerUser: LoginUser) {
    return this.http.post(this.urlRegister, registerUser);
  }

  getToken(loginUser: LoginUser) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.urlToken, loginUser, { headers: myHeaders })
      .pipe(map(data => {
        this.loginUser = new User(data[this.loginKey]);
        sessionStorage.setItem(this.tokenKey, data[this.tokenKey]);
        sessionStorage.setItem(this.loginKey, JSON.stringify(this.loginUser));
        this.currentUserSubject.next(this.loginUser);
        return data;
      }));
  }

  getAntiForgetyToken() {
    return this.http.get(this.urlAntiForgery, {});
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  //public get isAuthenticated(): boolean {
  //  if (sessionStorage.getItem(this.loginKey) && sessionStorage.getItem(this.tokenKey))
  //    return true;
  //  return false;
  //}

  public get userLogin(): string {
    return sessionStorage.getItem(this.loginKey);
  }

  logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem(this.loginKey);
    sessionStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }
}
