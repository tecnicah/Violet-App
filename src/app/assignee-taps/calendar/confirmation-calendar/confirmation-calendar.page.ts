import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-confirmation-calendar',
  templateUrl: './confirmation-calendar.page.html',
  styleUrls: ['./confirmation-calendar.page.scss'],
})
export class ConfirmationCalendarPage implements OnInit {

  constructor(public navParams: NavParams,
    public modalController: ModalController) { }

  ngOnInit() {
  }

  confirm() {
    this.modalController.dismiss(true);
  }

  cancel() {
    this.modalController.dismiss(false);
  }

}
