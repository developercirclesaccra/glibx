import { Storage } from '@ionic/storage';
import { AuthService } from './../services/auth.service';
import { ViewstoreComponent } from './../misc/viewstore/viewstore.component';
import { UiService } from './../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public storesData = [];
  constructor(private uiService: UiService, private authService: AuthService, private storage: Storage) {}

  ngOnInit() {
    this.getAllStores();
  }
  public goBack() {
    this.uiService.closeModal();
  }

  public openStore(data) {
    this.uiService.advanceModal(ViewstoreComponent, data);
  }

  public getAllStores() {
    this.storage.get('userKey').then((data) => {
      this.authService.getAllStores().subscribe(stored => {
        this.storesData = stored;
      })
    });
  }
}
