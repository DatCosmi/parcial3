import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { OnSameUrlNavigation } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalEditComponent } from '../tabs/modal-edit/modal-edit.component';
import { Product } from '../model/product';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  productList: any[] = [];

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController
  ) {}
  ngOnInit(): void {
    console.log('view did enter 2');
  }

  ionViewDidEnter() {
    console.log('view did enter 2');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  async getProducts() {
    try {
      await this.productService
        .getProducts()
        .subscribe((item) => (this.productList = item));
      console.log(this.productList);
    } catch (error) {
      console.log(error);
    }
  }

  async edit(item: Product) {
    const modal = await this.modalCtrl.create({
      component: ModalEditComponent,
      componentProps: {
        item,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }
  delete(item: any) {
    console.log(item);
  }
}
