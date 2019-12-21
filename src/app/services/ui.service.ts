import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public uKey;
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, 
              private loadCtrl: LoadingController, private router: Router, 
              private storage: Storage, public zone: NgZone, 
              public alertCtrl: AlertController) { }

  public async defaultModal(component) {
    const openModal = await this.modalCtrl.create({
      component: component
    });

    return await openModal.present();
  }

  public async advanceModal(component, data) {
    const openModal = await this.modalCtrl.create({
      component: component,
      componentProps: { data: data }
    });

    return await openModal.present();
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public async openLoader(msg) {
    const openLoad = await this.loadCtrl.create({
      message: msg,
      showBackdrop: true,
      spinner: 'crescent'
    });

    return await openLoad.present();
  }

  public closeLoader() {
    this.loadCtrl.dismiss();
  }

  public async successToast(msg) {
    const sucToast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'success'
    });

    return await sucToast.present()
  }

  public async errorToast(msg) {
    const errToast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });

    return await errToast.present()
  }

  public goBackRouter() {
    this.router.navigateByUrl('/tabs/tab4', { skipLocationChange: true });
  }

  public async addOpenReview(storeKey) {
    this.storage.get('userKey').then(data => {
      this.uKey = data;
    })
    const reviewAlt = await this.alertCtrl.create({
      message: '',
      inputs: [
        {
          name: 'review',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'descrutive'
        },
        {
          text: 'Send Review',
          handler: (reviewdata) => {
            // this.authService.addReview(reviewdata.review, this.uKey, storeKey);
          }
        }
      ]
    })

    return await reviewAlt.present();
  }
}
