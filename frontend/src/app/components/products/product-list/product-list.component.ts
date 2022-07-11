import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { APIs } from 'src/app/shared/APIs';
import { CrudHttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  currentProduct: any = {};
  currentIndex = -1;
  showEdit: boolean = false;
  isCartView: boolean = false;
  constructor(private httpService: CrudHttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var isViewCart: string = this.route.snapshot.params["view"] || "";
    isViewCart ? (this.isCartView = true) : (this.isCartView = false);
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    if (this.isCartView) {
      this.products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")!) : [];
    } else {
      this.httpService.get(APIs.PROD_ACTION + "all")
        .subscribe({
          next: (res) => {
            this.products = res.data;
            console.log(res);
          },
          error: (e: any) => console.error(e)
        });
    }

  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(prod: Product, index: number): void {
    this.currentProduct = prod;
    this.currentIndex = index;
    this.showEdit != this.showEdit;
  }

  addToCart(prod: any) {
    var products = [];
    if (localStorage.getItem("products")) {
      localStorage.getItem("products") ? products.push(...JSON.parse(localStorage.getItem("products")!)) : [];
    }
    const index = products.findIndex(object => object.id === prod.id);
    if (index === -1) {
      products.push(prod);
    }
    localStorage.setItem("products", JSON.stringify(products));
  }
  delProd(prod: any) {
    this.products = this.products.filter(e => e.id !== prod.id);
    localStorage.setItem("products", JSON.stringify(this.products));
  }
}