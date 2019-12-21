import { AuthService } from './../../services/auth.service';
import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss'],
})
export class EditStoreComponent implements OnInit {

  public name;
  public location;
  public phone;
  public web;
  public email;
  public desc;
  public facebook;
  public insta;
  public twitter;
  public data;
  public imgurl = null;

  public camOpts: CameraOptions = {
    mediaType: this.camera.MediaType.PICTURE,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 80,
    encodingType: this.camera.EncodingType.JPEG
  }
  constructor(private uiService: UiService, private camera: Camera, private authService: AuthService,
    private storage: Storage) { }

  ngOnInit() {
    this.location = this.data['location'];
    this.name = this.data['name'];
    this.phone = this.data['phone'];
    this.web = this.data['web'];
    this.email = this.data['email'];
    this.desc = this.data['desc'];
    this.facebook = this.data['facebook'];
    this.insta = this.data['insta'];
    this.twitter = this.data['twitter'];
  }

  public goBack() {
    this.uiService.closeModal();
  }

  public getPicture() {
    this.camera.getPicture(this.camOpts).then((datapic) => {
      this.imgurl = `data:image/jpeg;base64,${datapic}`;
    })
  }

  public editStore() {
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
