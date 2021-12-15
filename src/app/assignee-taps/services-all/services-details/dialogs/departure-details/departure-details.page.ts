import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-departure-details',
  templateUrl: './departure-details.page.html',
  styleUrls: ['./departure-details.page.scss'],
})
export class DepartureDetailsPage implements OnInit {

  constructor(public loader:LoadingService,public modalController: ModalController, public _services: GeneralService) { }

  public userData:any;
  public data_:any;
  //*****************************************************************//
  ngOnInit() {
    this.loader.loadingPresent();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_ = JSON.parse(localStorage.getItem('departure'));
    this.getCatalogos();
    console.log(this.data_);
  }
  //*****************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  public ca_currency = [];
  public ca_dependent = [];
  async getCatalogos(){
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
        
    this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(localStorage.getItem('srAd'))).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });
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
  //FUNCION PARA GUARDAR//
  save() {
    this.loader.loadingPresent();
    this.data_.updateBy = this.userData.id;
    this.data_.updatedDate = new Date();
     this._services.service_general_put("HousingList/PutDepartureDetails", this.data_).subscribe((data => {
       if (data.success) {
         console.log(data);
         this.general_messages({
           title: "Success",
           body: "Departure Details was updated",
           success: true
         });
         this.modalController.dismiss();
         this.loader.loadingDismiss();
       }
     }))
   }
}
