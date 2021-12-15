import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(public modalController: ModalController,
    private statusBar: StatusBar) { }

  slideOptsOne = {
    slidesPerView: 1,
    autoplay:false
   };

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.statusBar.styleDefault();
    this.slideOptsOne = {
      slidesPerView: 1,
      autoplay:false
     };
  }

  back(){
    let back : any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }


}
