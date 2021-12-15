import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  constructor(public modalController: ModalController) { }

  slideOptsOne = {
    slidesPerView: 1,
    autoplay:false
   };

  ngOnInit() {
  }
  ionViewWillEnter(){
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
