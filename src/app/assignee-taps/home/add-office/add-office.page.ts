import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.page.html',
  styleUrls: ['./add-office.page.scss'],
})
export class AddOfficePage implements OnInit {

  
  constructor(public _services: GeneralService, public modalController: ModalController,public navParams:NavParams) { }

  public data_:any = { };

  ngOnInit() {
    this.getCatalogos();
  }

  public ca_office = [];
  async getCatalogos(){
    this.ca_office = await this._services.getCatalogueFrom('GetOffice');
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
