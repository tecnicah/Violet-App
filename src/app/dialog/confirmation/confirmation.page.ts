import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  constructor(public navParams: NavParams,
              public modalController: ModalController,) { }

  header = this.navParams.get('header');
  body = this.navParams.get('body');
  yesText = this.navParams.get('yesText');
  noText = this.navParams.get('noText');

  ngOnInit() {
  }

  confirm(){
    this.modalController.dismiss(true);
  }

  cancel(){
    this.modalController.dismiss(false);
  }

}
