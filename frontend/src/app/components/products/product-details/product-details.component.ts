import { Component, Input, OnInit } from '@angular/core';
import { CrudHttpService } from 'src/app/shared/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { APIs } from 'src/app/shared/APIs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    title: '',
    description: '',
    price: 0,
    photo: "",
    extras: Object
  };

  message = '';

  constructor(private httpService: CrudHttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }
  ngOnChanges() {
    console.log(this.currentProduct);

  }

  getProduct(id: string): void {
    this.httpService.get(APIs.PROD_ACTION + id)
      .subscribe({
        next: (res) => {
          this.currentProduct = res.data;
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.message = '';
    this.httpService.put(APIs.PROD_ACTION + this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          alert(res.msg);
          this.router.navigateByUrl("/product/list");
        },
        error: (e) => console.error(e)
      });
  }

  deleteProduct(): void {
    if (confirm("Product will be deleted. Do you want to delete?")) {
      this.httpService.delete(APIs.PROD_ACTION + this.currentProduct.id)
        .subscribe({
          next: (res) => {
            alert(res.msg);
            this.router.navigateByUrl("/product/list");
          },
          error: (e) => console.error(e)
        });
    }
  }

  goBack() {
    this.router.navigateByUrl("/product/list");
  }

}