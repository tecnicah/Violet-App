import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss'],
})
export class ContractDetailsPage implements OnInit {
  public addReminder_: boolean = false;
  public reminder_data: any = {};
  public userData: any;
  constructor(public loader:LoadingService,public modalController: ModalController, public _services: GeneralService) { }

  //*****************************************************************//
  public data_: any;
  ngOnInit() {
    this.getCatalogos();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_ = JSON.parse(localStorage.getItem('contractDetails'));
    console.log("Data contract: ", this.data_);
  }
  //*****************************************************************//
  //CONSULTA DE CATALOGOS//
  ca_currency = [];
  ca_duration = [];
  async getCatalogos() {
    this.loader.loadingPresent();
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    let ca_duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_duration = ca_duration.filter(function (E) {
      if (E.recurrence != null && E.id != 7 && E.id != 6) {
        return true;
      }
    })
    this.loader.loadingDismiss();
  }
  //*****************************************************************//
  //ADD EXPENSE//
  addExpense() {
    this.data_.propertyExpenses.push({
      "id": 0,
      "contractDetail": this.data_.contractDetailId,
      "expense": this.reminder_data.expense,
      "amount": this.reminder_data.amount,
      "currency": this.reminder_data.currency,
      "recurrence": this.reminder_data.recurrence,
      "included": this.reminder_data.included,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updateBy": this.userData.id,
      "updatedDate": new Date(),
    })
    this.reminder_data.expense = '';
    this.reminder_data.amount = '';
    this.reminder_data.recurrence = null;
    this.reminder_data.currency = null;
    this.reminder_data.included = null;
    this.addReminder_ = false;
  }
  //*****************************************************************//
  //OBTENIENDO RECURRENCIA//
  getRecurrence(id) {
    for (let i = 0; i < this.ca_duration.length; i++) {
      if (this.ca_duration[i].id == id) {
        return this.ca_duration[i].recurrence;
      }
    }
  }
  //*****************************************************************//
  //FUNCION PARA REGRESAR A LA PAGINA ANTERIOR//
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
  //FUNCION PARA GUARDAR//
  save() {
    this.loader.loadingPresent();
   this.data_.updateBy = this.userData.id;
   this.data_.updatedDate = new Date();
    this._services.service_general_put("HousingList/PutContractDetail", this.data_).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Contract Details was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.modalController.dismiss();
      }
    }))
  }


}
