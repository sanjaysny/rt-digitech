import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  cartDiv: boolean = false;
  products: Product[] = [];
  totalPrice: number = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  @HostListener('document:click', ['$event']) onDivOutsideClick(event: any) {
    this.cartDiv = false
  }
  showCartDiv(evt: any) {
    evt.stopPropagation();
    this.cartDiv = !this.cartDiv;
    this.products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")!) : [];
    this.products.forEach((ele: any) => {
      this.totalPrice += ele?.price;
    });
  }
  removeProdFormCart(prod: any) {
    this.products = this.products.filter(e => e.id !== prod.id);
    localStorage.setItem("products", JSON.stringify(this.products));
  }
  viewCart() {
    this.router.navigateByUrl("/product/list/true");
  }


}
