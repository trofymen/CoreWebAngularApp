import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product/product';
import { AuthService } from './auth.service';

//providers: [LoginService]

@Injectable({ providedIn: 'root' })
export class DataService {

  private url = "/api/products";
  private tokenKey = "accessToken";

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get(this.url);
  }

  getProduct(id: number) {

    //const token = sessionStorage.getItem(this.authenticationService.tokenKey);
    let myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    //let myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get(this.url + '/' + id, { headers: myHeaders });
  }

  createProduct(product: Product) {
    return this.http.post(this.url, product);
  }
  updateProduct(id: number, product: Product) {

    return this.http.put(this.url + '/' + id, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
