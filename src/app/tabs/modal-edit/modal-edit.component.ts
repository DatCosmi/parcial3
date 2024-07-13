import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  formGroup!: FormGroup;

  @Input() item?: Product;
  productName: string = '';
  productCode: string = '';
  productCategory: string = '';
  productDescription: string = '';
  productPrice: number | undefined = undefined;
  productAmount: number | undefined = undefined;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.item) {
      this.productName = this.item.name;
      this.productPrice = this.item.price;
    }
  }

  initForm() {
    if (!this.item) {
      this.formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        code: ['', Validators.required],
        category: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        amount: ['', Validators.required],
      });
    } else {
      this.formGroup = this.formBuilder.group({
        name: [this.item.name || '', Validators.required],
        code: [this.item.code || '', Validators.required],
        category: [this.item.category || '', Validators.required],
        description: [this.item.description || '', Validators.required],
        price: [this.item.price || '', Validators.required],
        amount: [this.item.amount || '', Validators.required],
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    let request = {
      id: this.item != null ? this.item._id : null,
      name: this.formGroup.value.name,
      code: this.formGroup.value.code,
      category: this.formGroup.value.category,
      description: this.formGroup.value.description,
      price: this.formGroup.value.price,
      amount: this.formGroup.value.amount,
    };
    console.log(request);
    try {
      if (!this.item) {
        this.productService
          .addProduct(request)
          .subscribe((item) => console.log(item));
      } else {
        this.productService
          .editProduct(request)
          .subscribe((item) => console.log(item));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
