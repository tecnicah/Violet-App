import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-general-mensage',
  templateUrl: './general-mensage.page.html',
  styleUrls: ['./general-mensage.page.scss'],
})
export class GeneralMensagePage implements OnInit {

  public title = this.navParams.get('title');
  public body = this.navParams.get('body');
  public success = this.navParams.get('success');

  constructor(public navParams: NavParams,
    public modalController: ModalController) {}
  ngOnInit() {
    console.log(this.title, this.body);
  }

  ionViewWillEnter(){
    if(this.success){
      let play: any = document.getElementById('success');
      play.play();
    }else{
      let play: any = document.getElementById('error');
      play.play();
    }
  }

}
