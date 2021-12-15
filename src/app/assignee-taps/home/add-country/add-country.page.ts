import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.page.html',
  styleUrls: ['./add-country.page.scss'],
})
export class AddCountryPage implements OnInit {


  constructor(public _services: GeneralService, public modalController: ModalController, public navParams: NavParams) { }

  data: any = {}

  ngOnInit(): void {
    this.catalogos();
  }
  //******************************************************************//
  ca_country = [];
  async catalogos() {
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    console.log(this.ca_country);
  }
  //******************************************************************//
  save_office() {
    this.data.success = true;
    this.modalController.dismiss(this.data);
  }
  //*******************************************************************//
  back(){
    this.modalController.dismiss();
  }

}