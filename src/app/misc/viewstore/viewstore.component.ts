import { ProductAddComponent } from './../product-add/product-add.component';
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ViewproductComponent } from '../viewproduct/viewproduct.component';

@Component({
  selector: 'app-viewstore',
  templateUrl: './viewstore.component.html',
  styleUrls: ['./viewstore.component.scss'],
})
export class ViewstoreComponent implements OnInit {
  public storeseg;
  public data;
  public ownerBool = false;
  public productsData;
  public reviewData;
  constructor(private uiService: UiService, private storage: Storage, private authService: AuthService) {

  }

  ngOnInit() {
    this.storeseg = 'products'
    this.checkOwner();
    this.getProducts();
    this.getAllReview();
  }

  public goBack() {
    this.uiService.closeModal();
  }

  public addProd() {
    this.uiService.defaultModal(ProductAddComponent);
  }

  public openReview() {
    // this.uiService.addReview()
  }
  public openProduct(data) {
    this.uiService.advanceModal(ViewproductComponent, data)
  }

  public checkOwner() {
    this.storage.get('userKey').then((data) => {
      if (this.data['ownerId'] === data) {
        this.ownerBool = true
      } else {
        this.ownerBool = false
      }
    })
  }

  public getProducts() {
    this.authService.getAllStoreProd(this.data['storeId']).subscribe(res => {
      this.productsData = res;
    })
  }

  public getAllReview() {
    this.authService.getReview(this.data['storeId']).subscribe(data => {
      this.reviewData = data;
      console.log(data);
    })
  }
}
