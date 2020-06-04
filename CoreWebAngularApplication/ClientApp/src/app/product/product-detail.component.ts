import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Product } from './product';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './product-detail.component.html',
  //providers: [DataService]
})
export class ProductDetailComponent implements OnInit {

  id: number;
  product: Product;
  loaded: boolean = false;
  notFound: boolean = false;

  constructor(private dataService: DataService, activeRoute: ActivatedRoute, private router: Router) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    if (this.id)
      this.dataService.getProduct(this.id)
        .subscribe((data: Product) => {
          if (data != null) {
            this.loaded = true;
            this.product = data;
            this.notFound = false;
          }
        }, error => {
            if (error.status == 404) {
              this.router.navigateByUrl("/not-found");
              //this.product = new Product();
              //this.product.id = this.id;
              //this.loaded = false;
              //this.notFound = true;
            }
        });
  }
}
