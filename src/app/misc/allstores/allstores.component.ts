import { Storage } from '@ionic/storage';
import { AuthService } from './../../services/auth.service';
import { CreatestoreComponent } from './../createstore/createstore.component';
import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ViewstoreComponent } from '../viewstore/viewstore.component';

@Component({
  selector: 'app-allstores',
  templateUrl: './allstores.component.html',
  styleUrls: ['./allstores.component.scss'],
})
export class AllstoresComponent implements OnInit {
  public userStoresData;
  constructor(private uiService: UiService, private authService: AuthService, private storage: Storage) { }

  ngOnInit() {
    this.getUserStore();
  }

  public openStore(data) {
    this.uiService.advanceModal(ViewstoreComponent, data);
  }
  public goBack() {
    this.uiService.closeModal();
  }
  public addStore() {
    this.uiService.defaultModal(CreatestoreComponent)
  }

  public getUserStore() {
    this.storage.get('userKey').then((data) => {
      this.authService.getAllUserStore(data).subscribe(res => {
        this.userStoresData = res;
        console.log(res);
      });
    })
  }
}
