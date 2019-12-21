import { ModalController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Storage } from '@ionic/storage';
import { AllstoresComponent } from './../misc/allstores/allstores.component';
import { AboutComponent } from './../misc/about/about.component';
import { EditProfileComponent } from './../misc/edit-profile/edit-profile.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { UiService } from '../services/ui.service';
import { WelcomeComponent } from '../misc/welcome/welcome.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public authCheckBool = false;
  public userKey;
  public userData;

  constructor(private uiService: UiService, private storage: Storage, private authService: AuthService,
    private run: NgZone, private modalCtrl: ModalController) { }

  ngOnInit() {
    // this.storage.set('userKey', 'khX63sqK1zWRiS4zIPWzlMioFKn1')
    this.getUserKey();
    setTimeout(() => {
      console.log(this.authCheckBool);
      if (this.authCheckBool !== false ) {
        this.getUserProfile();
      }
    }, 1000);
  }

  public openEditProfile() {
    this.uiService.advanceModal(EditProfileComponent, this.userData);
  }

  public openAbout() {
    this.uiService.defaultModal(AboutComponent);
  }
  public openStores() {
    this.uiService.defaultModal(AllstoresComponent);
  }
  public async openLogin() {
    const loginModal = await this.modalCtrl.create({
      component: WelcomeComponent
    });
    await loginModal.present();
    loginModal.onDidDismiss().then((data) => {
      alert(data);
    })
  }
  public getUserKey() {
    this.storage.get('userKey').then(data => {
      this.userKey = data;
      console.log(data);
      if (data !== null) {
        this.authCheckBool = true;
      } else {
        this.authCheckBool = false;
      }
    })
  }

  public getUserProfile() {
    this.storage.get('userKey').then(data => {
      this.authService.getUserProfile(data).subscribe(data => {
        this.userData = data;
        console.log(data);
      })
    })
  }
}
