import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(public router:Router,public modalCtrl:ModalController, public navParams:NavParams) { }

  public data_show:any;

  ngOnInit() {
    console.log("Data recibida en el modal: ",this.navParams.data);
    this.data_show = this.navParams.data;
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  confirm(){
    this.modalCtrl.dismiss();
    if(this.data_show.type == 1){ 
      this.router.navigateByUrl('assignee-taps/chat-premier');
    }else{
      this.router.navigateByUrl('assignee-taps/notifications');
    }
  }

}
