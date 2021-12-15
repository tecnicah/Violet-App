import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GeneralService } from 'src/app/general/general.service';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.page.html',
  styleUrls: ['./translate.page.scss'],
})
export class TranslatePage implements OnInit {

  constructor(private iab: InAppBrowser,
    private router: Router,
    public sanitizer: DomSanitizer,
    public service: GeneralService) { }

  public url = "https://translate.google.com.mx/";

  ngOnInit() {
    this.iab.create(this.url,"_blank");
  }

  Scroll(event) {
    this.service.onScroll(event);
  }
  
  openURL(){      return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);    }
}
