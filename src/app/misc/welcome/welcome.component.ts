import { UiService } from './../../services/ui.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  constructor(private googlePlus: GooglePlus, private uiService: UiService,
    private firestore: AngularFirestore, private auth: AngularFireAuth,
    private storage: Storage, private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  public async loginGoogle() {
    this.uiService.openLoader('Logging in...');
    alert('logged-in')
    return this.googlePlus.login({
      'webClientId': '163396243361-rvecajpeqr4r009lrqroef38i26nm979.apps.googleusercontent.com',
      'offline': true,
    }).then((res) => {
      const googleCred = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      firebase.auth().signInWithCredential(googleCred).then((data) => {
        const profileData = {
          name: data.user.displayName,
          email: data.user.email,
          uid: data.user.uid,
          photoURL: data.user.photoURL,
        };
        alert(profileData);
        alert(data);
        this.firestore.collection('users').doc(`${data.user.uid}`).set(profileData).then(() => {
          this.setStorage(data.user.uid);
          this.uiService.closeLoader();
          this.modalCtrl.dismiss('loggedin')
          this.uiService.successToast('User Logged Successful')
        }).catch(err => {
          this.uiService.closeLoader();
          alert(err.message);
          this.uiService.errorToast(err.message);
        });
      }).catch(err => {
        this.uiService.closeLoader();
        alert(err.message);
        this.uiService.errorToast(err.message);
      })
    });
  }

  async login() {
    let params;
      params = {
        'webClientId': '124018728460-sv8cqhnnmnf0jeqbnd0apqbnu6egkhug.apps.googleusercontent.com',
        'offline': true
      }
    this.googlePlus.login(params)
      .then((response) => {
        const { idToken, accessToken } = response
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.auth.auth.signInWithCredential(credential)
      .then((response) => {
        // this.router.navigate(["/profile"]);
        alert(response.user.displayName)
        this.uiService.closeLoader();
      })

  }
  onLoginError(err) {
    console.log(err);
  }

  public setStorage(key) {
    this.storage.set('userKey', key);
  }

  public signOut() {
    this.uiService.openLoader('Signing Out...');
    this.auth.auth.signOut().then(() => {
      this.uiService.closeLoader();
      this.uiService.successToast('Logged Out Successful');
      this.storage.remove('userKey');
    })
  }

  public goBack() {
    this.uiService.closeModal();
  }
}
