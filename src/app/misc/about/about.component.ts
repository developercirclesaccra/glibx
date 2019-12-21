import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  constructor(private uiService: UiService) { }

  ngOnInit() { }

  public goBack() {
    this.uiService.closeModal();
  }
}
