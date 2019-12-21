import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  public first_name;
  public last_name;
  public email;
  public data;
  constructor(private uiService: UiService, private storage: Storage, private authService: AuthService) { }

  ngOnInit() {
    let nameData = this.data['displayName'];
    this.first_name = nameData.substr(0, nameData.indexOf(' '));
    this.last_name = nameData.substr(nameData.indexOf(' ') + 1);
    this.email = this.data['email'];
  }

  public goBack() {
    this.uiService.closeModal();
  }

  public upDateProfile() {
    const updateData = {
      first_name: this.first_name,
      last_name: this.last_name,
    }
    this.storage.get('userKey').then((resdata) => {
      this.authService.editProfile(resdata, updateData);
    })
  }
}
