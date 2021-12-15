import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-add-emergency',
  templateUrl: './add-emergency.page.html',
  styleUrls: ['./add-emergency.page.scss'],
})
export class AddEmergencyPage implements OnInit {

  constructor(public _services: GeneralService, public modalController: ModalController,public navParams:NavParams) { }

  public data_:any = { };

  ngOnInit() {
    let data_recibida = this.navParams.data;
    console.log(data_recibida);
    if(data_recibida.id != undefined && data_recibida.id != null && data_recibida.id != 0){
         this.data_ = data_recibida;
    }else{
      this.data_ = data_recibida;
    }
    this.getCatalogos();
  }

  public ca_relation = [];
  async getCatalogos(){
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
  }

  back(){
    this.modalController.dismiss();
  }

  save(){
    this.data_.modal = '';
    this.data_.success = true;
    console.log(this.data_);
    this.modalController.dismiss(this.data_);
  }

}
