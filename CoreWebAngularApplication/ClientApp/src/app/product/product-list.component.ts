import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from './product';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  error: '';
  products: Product[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.load();
  }
  load() {
    this.dataService.getProducts().subscribe((
      data: Product[]) => this.products = data,
      error => {
        console.log(error);
        this.error = error;
      });
  }
  delete(id: number) {
    this.dataService.deleteProduct(id).subscribe(
      data => this.load(),
      error => {
        console.log(error);
        this.error = error;
      });
  }
}
