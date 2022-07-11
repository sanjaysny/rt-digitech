import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudHttpService } from 'src/app/shared/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIs } from 'src/app/shared/APIs';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  showExtraDetails: boolean = false;
  prodToEdit: any;
  isEdit: boolean = false;
  constructor(private httpService: CrudHttpService, private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initProductForm();
    var prodId: string = this.route.snapshot.params["id"] || "";
    this.isEdit = false
    if (prodId) {
      this.getProduct(prodId);
      this.isEdit = true
    }
  }

  initProductForm(data?: any) {
    this.productForm = this.fb.group({
      title: [data?.title ? data.title : "", [Validators.required]],
      photo: [data?.photo ? data.photo : "", [Validators.required]],
      description: [data?.description ? data.description : ""],
      price: [data?.price ? data.price : "", [Validators.required]],
      extraDetails: this.fb.array([this.createProdExtraDetails()])
    });
  }

  createProdExtraDetails(data?: any): FormGroup {
    var extraDetails = this.fb.group({
      key: [data?.key ? data.key : ""],
      value: [data?.value ? data.value : ""]
    });
    return extraDetails;
  }
  getProdExtraDetails() {
    var extraDetailsForm = this.productForm.get('extraDetails') as FormArray;
    return extraDetailsForm.controls;
  }

  addProdExtraDetailsForm(data?: any) {
    console.log(data);

    const extraDetailsForm = this.productForm.get('extraDetails') as FormArray;
    var edForm = this.createProdExtraDetails(data);
    extraDetailsForm.push(edForm);
  }
  removeProdExtraDetailsForm(i: number, forceRemove?: boolean) {
    const extraDetailsForm = this.productForm.get('extraDetails') as FormArray;
    if (extraDetailsForm.length > 1 || forceRemove) {
      extraDetailsForm.removeAt(i);
    } else {
      extraDetailsForm.removeAt(i);
      this.addProdExtraDetailsForm();
    }
  }
  getNonEmptyItems(formArray: any): any {
    console.log(formArray);

    return formArray.filter((ele: any) => {
      return Object.keys(ele).filter(key => ele[key].toString() == '' && key.toLocaleLowerCase()).length == 0;
    });
  }
  saveProduct(): void {
    let prodArray = this.productForm.get('extraDetails') as FormArray;

    var data = {
      ...this.productForm.value
    }
    data.extraDetails = this.getNonEmptyItems(prodArray.value);
    if (this.productForm.valid) {
      this.httpService.post("/", data)
        .subscribe({
          next: (res) => {
            if (res.status == 200) {
              console.log(res);
              alert(res.msg);
              this.router.navigateByUrl("/product/list");
            }
            else {
              alert(res.msg);
            }
          },
          error: (e) => {
            console.error(e);
            alert(e.msg);
          }
        });
    } else {
      alert("Product details is invalid. Please check!");
    }

  }

  imageUpload(event: any) {
    if (event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpeg"
      || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/webp") {
      if (event.target.files[0].size / 1024 / 1024 <= 1) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.productForm.get("photo")?.setValue(event.target.result, { emitEvent: false });
          this.changeDetector.detectChanges();
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      else {
        alert("Image size must be less than 1MB.")
      }
    } else {
      alert("Please select image only.")
    }
  }

  numberOnly(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
      if (evt.target.value.indexOf('.') === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;
    }
    return true;
  }

  toggleExtraDetails() {
    this.showExtraDetails = !this.showExtraDetails;
  }
  getProduct(id: string): void {
    this.httpService.get(APIs.PROD_ACTION + id)
      .subscribe({
        next: (res) => {
          this.prodToEdit = res.data;
          this.initProductForm(this.prodToEdit);
          this.removeProdExtraDetailsForm(0, true);
          this.prodToEdit.extraDetails.forEach((ele: any) => {
            this.addProdExtraDetailsForm(ele);
          })
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.httpService.put(APIs.PROD_ACTION + this.prodToEdit.id, this.productForm.value)
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
      this.httpService.delete(APIs.PROD_ACTION + this.prodToEdit.id)
        .subscribe({
          next: (res) => {
            alert(res.msg);
            this.router.navigateByUrl("/product/list");
          },
          error: (e) => console.error(e)
        });
    }
  }
  back() {
    this.router.navigateByUrl("/product/list");
  }

}