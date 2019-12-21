import { AuthService } from './../services/auth.service';
import { ViewproductComponent } from './../misc/viewproduct/viewproduct.component';
import { UiService } from './../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public allProds;
  constructor(private uiService: UiService, private authService: AuthService) {}

  ngOnInit() {
    this.getAllProds()
  }

  public openProduct(data) {
    this.uiService.advanceModal(ViewproductComponent, data)
  }

  public getAllProds() {
    this.authService.getAllProducts().subscribe(data => {
      this.allProds = data;
      console.log(data);
      
    })
  }
}
