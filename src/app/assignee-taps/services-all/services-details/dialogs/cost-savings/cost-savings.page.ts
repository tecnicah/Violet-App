import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-cost-savings',
  templateUrl: './cost-savings.page.html',
  styleUrls: ['./cost-savings.page.scss'],
})
export class CostSavingsPage implements OnInit {

  constructor(public loader:LoadingService, public modalController: ModalController, public _services: GeneralService) { }

  public addReminder_: boolean = false;
  public reminder_data: any = {};
  public userData: any;
  public data_: any;
  //*****************************************************************//
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_ = JSON.parse(localStorage.getItem('cost'));
    console.log(this.data_);
  }
  //*****************************************************************//
  //CONSULTA DE CATALOGOS//
  public ca_currency = [];
  async getCatalogos() {
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.loader.loadingDismiss();
  }
  //*****************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }
  //*****************************************************************//
  //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
  async general_messages(data) {
    const modal = await this.modalController.create({
      component: GeneralMensagePage,
      cssClass: 'modal-general-mensage',
      backdropDismiss: true,
      componentProps: data
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    })
    this.modalController.dismiss();

    await modal.present();
  }
  //*****************************************************************//
  //ADD EXPENSE//
  addCost() {
    this.loader.loadingPresent();
    this.reminder_data.updateBy = this.userData.id;
    this.reminder_data.updatedDate = new Date();
    this.reminder_data.id = 0;
    this.reminder_data.housingList = Number(localStorage.getItem('id'));
    this._services.service_general_put("HousingList/PutSavingHomeHome", this.reminder_data).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.data_.push(data.result);
      }
    }))
    this.loader.loadingDismiss();
    this.reminder_data.costType = '';
    this.reminder_data.currency = null;
    this.reminder_data.costSavings = '';
    this.addReminder_ = false;
  }
  //*****************************************************************//
   getPayment(id){
    for (let i = 0; i < this.ca_currency.length; i++) {
      if(this.ca_currency[i].id == id){
         return this.ca_currency[i].currency;
      }
    }
  }
  //*****************************************************************//
  //FUNCION PARA GUARDAR//
  save() {
    this.general_messages({
      title: "Success",
      body: "Payments was updated",
      success: true
    });
    this.modalController.dismiss();
  }
}

