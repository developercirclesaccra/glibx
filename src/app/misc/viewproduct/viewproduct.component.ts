import { AuthService } from './../../services/auth.service';
import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.scss'],
})
export class ViewproductComponent implements OnInit {
  public data;
  public storeData = null;
  public profvOpts = {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    }
  }
  constructor(private uiService: UiService, private authService: AuthService) { }

  ngOnInit() {
    this.getStore();
  }

  public goBack() {
    this.uiService.closeModal();
  }

  public getStore() {
    this.authService.getStore(this.data['storeId']).subscribe(data => {
      this.storeData = data;
    });
  }
}
