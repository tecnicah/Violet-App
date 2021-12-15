import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-landlord-details',
  templateUrl: './landlord-details.page.html',
  styleUrls: ['./landlord-details.page.scss'],
})
export class LandlordDetailsPage implements OnInit {

  constructor(public loader:LoadingService,public modalController: ModalController, public _services:GeneralService) { }
  public data_land : any = {
    creditCardLandLordDetails:[]
  };
  public userData:any;
  ngOnInit() {
    this.loader.loadingPresent();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_land = JSON.parse(localStorage.getItem('data_land'));
    console.log(this.data_land);
    this.getCatalogos();
  }
  //*******************************************************//
  //CONSULTA CATALOGOS//
  public ca_creditCard = [];
  public ca_currency = [];
  public ca_accountType = [];
  async getCatalogos(){
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    if(this.data_land.creditCardLandLordDetails){
      this.ca_creditCard.forEach(E => {
      for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
          if(this.data_land.creditCardLandLordDetails[i].creditCard == E.id){
            E.checked = true;
          }
        }
      })
    }
    this.loader.loadingDismiss();
  }
  //*******************************************************//
  //LLENADO DE NODO CREDITCARD//
  guarda_card(data, card){
    console.log(data);
    console.log(card);
    if(data.checked){
       this.data_land.creditCardLandLordDetails.push({
          landLord: 0,
          creditCard: card.id
       });
    }else{
      for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
        if(this.data_land.creditCardLandLordDetails[i].creditCard == card.id){
          this.data_land.creditCardLandLordDetails.splice(i,1);
        }
      }
    }
  }
  //*******************************************************//
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
  //*******************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save(){
    this.loader.loadingPresent();
    this.data_land.createdBy = this.userData.id;
    this.data_land.createdDate = new Date();
    this.data_land.updateBy = this.userData.id;
    this.data_land.updatedDate = new Date();
    console.log("DATA A GUARDAR LAND LORD (ACTUALIZACION): ", this.data_land);
    this._services.service_general_put("HousingList/PutLandlordDetailsHome", this.data_land).subscribe((data => {
      if(data.success){
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Land lord Details was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.modalController.dismiss();
      }
    }),(err)=>{
      console.log("error al guardar land lord  details: ", err);
    })
  }
}