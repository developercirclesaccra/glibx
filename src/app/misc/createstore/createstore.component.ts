import { Storage } from '@ionic/storage';
import { AuthService } from './../../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createstore',
  templateUrl: './createstore.component.html',
  styleUrls: ['./createstore.component.scss'],
})
export class CreatestoreComponent implements OnInit {
  public name;
  public location;
  public phone;
  public web;
  public email;
  public desc;
  public imgurl = null;

  public camOpts: CameraOptions = {
    mediaType: this.camera.MediaType.PICTURE,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 80,
    encodingType: this.camera.EncodingType.JPEG
  }
  constructor(private uiService: UiService, private camera: Camera, private authService: AuthService,
    private storage: Storage) { }

  ngOnInit() { }

  public goBack() {
    this.uiService.closeModal();
  }

  public getPicture() {
    this.camera.getPicture(this.camOpts).then((datapic) => {
      this.imgurl = `data:image/jpeg;base64,${datapic}`;
    })
  }

  public createStore() {
    let storeData = {
      name: this.name,
      location: this.location,
      phone: this.phone,
      web: this.web,
      email: this.email,
      desc: this.desc
    }
    console.log(storeData);
    
    // this.storage.get('userKey').then((udata) => {
    //   this.authService.createStore(this.imgurl, storeData, udata);
    // })
  }
}
