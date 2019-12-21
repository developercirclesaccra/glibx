import { UiService } from './ui.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public createdAt = firebase.firestore.Timestamp.now().seconds;
  constructor(private uiService: UiService,
    private firestore: AngularFirestore,
    private storage: Storage) { }

  public editProfile(key, data) {
    this.uiService.openLoader('Updating Profile')
    return this.firestore.collection('users').doc(key).update({
      displayName: `${data.first_name} ${data.last_name}`
    }).then(() => {
      this.uiService.closeLoader();
      this.uiService.closeModal();
      this.uiService.successToast('Profile Edited Successfully');
    }).catch(err => {
      this.uiService.closeLoader();
      this.uiService.errorToast(err.message);
    })
  }

  public getUserProfile(key) {
    return this.firestore.collection('users').doc(key).valueChanges();
  }

  public createStore(img, data, key) {
    let storeData = {
      name: data.name,
      email: data.email,
      web: data.web,
      desc: data.desc,
      phone: data.phone,
      location: data.location,
      insta: '',
      twitter: '',
      facebook: '',
      ownerId: key
    }
    const fileName = Math.floor(Date.now() / 1000);
    return this.firestore.collection('stores').add(storeData).then((storeres) => {
      firebase.storage().ref().child(`stores/imgs/${fileName}`).putString(img, firebase.storage.StringFormat.DATA_URL).then((photores) => {
        photores.ref.getDownloadURL().then((dwdata) => {
          this.firestore.collection('stores').doc(storeres.id).update({
            storeId: storeres.id,
            cover: dwdata
          })
        })
      });
    }).then(() => {
      this.uiService.closeLoader();
      this.uiService.closeModal();
      this.uiService.successToast('Store Created Successful');
    })
      .catch(err => {
        this.uiService.closeLoader();
        this.uiService.errorToast(err.message);
      })
  }

  public getAllUserStore(key) {
    return this.firestore.collection('stores', ref => ref.where('ownerId', '==', key)).valueChanges();
  }
  public getStore(key) {
    return this.firestore.collection('stores', ref => ref.where('storeId', '==', key)).valueChanges();
  }
  public getAllStoreProd(key) {
    return this.firestore.collection('products', ref => ref.where('storeId', '==', key)).valueChanges();
  }

  public editStore(img, data, key) {
    let storeData = {
      name: data.name,
      email: data.email,
      web: data.web,
      desc: data.desc,
      phone: data.phone,
      location: data.location,
      insta: data.insta,
      twitter: data.twitter,
      facebook: data.fb
    }
    const fileName = Math.floor(Date.now() / 1000);
    let storageRef = firebase.storage().ref().child(`stores/${fileName}.jpg`).putString(img, firebase.storage.StringFormat.DATA_URL).then((photores) => {
      photores.ref.getDownloadURL().then((dwdata) => {
        storeData['logo'] = dwdata;
        this.firestore.collection('stores').doc(key).update(storeData).then(() => {
          this.uiService.closeLoader();
          this.uiService.closeModal();
          this.uiService.successToast('Store Created Successful');
        })
      })
    }).catch(err => {
      this.uiService.closeLoader();
      this.uiService.errorToast(err.message);
    })
  }

  public getAllProducts() {
    return this.firestore.collection('products', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  }
  public getAllStores() {
    return this.firestore.collection('stores', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  }

  public addProduct(images, data, userKey, storeKey) {
    const prodData = {
      name: data.name,
      price: data.price,
      desc: data.desc,
      type: data.type,
      category: data.category,
      ownerId: userKey,
      storeKey: storeKey
    }
    return this.firestore.collection('products').add(prodData).then((resdata) => {

    });
  }

  public deleteProd() {

  }

  public editProd() {

  }

  public addReview(text, userkey, storeId) {
    this.uiService.openLoader('Sending review...')
    const reviewData = {
      userKey: userkey,
      review: text,
      createdAt: this.createdAt,
      storeId: storeId
    }
    return this.firestore.collection('reviews').add(reviewData).then((resdata) => {
      this.firestore.collection('reviews').doc(`${resdata.id}`).update({
        reviewId: resdata.id
      })
    }).then(() => {
      this.uiService.closeLoader();
      this.uiService.alertCtrl.dismiss();
      this.uiService.successToast('Review added successully.')
    }).catch(err => {
      this.uiService.closeLoader();
      this.uiService.alertCtrl.dismiss();
      this.uiService.errorToast(err.message)
    })
  }

  public getReview(key) {
    return this.firestore.collection('reviews', ref => ref.where('storeId', '==', key).orderBy('createdAt','desc')).valueChanges();
  }
}
