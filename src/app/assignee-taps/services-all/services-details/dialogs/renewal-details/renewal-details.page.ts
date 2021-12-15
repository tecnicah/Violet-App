import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-renewal-details',
  templateUrl: './renewal-details.page.html',
  styleUrls: ['./renewal-details.page.scss'],
})
export class RenewalDetailsPage implements OnInit {

  constructor(public loader:LoadingService,public modalController: ModalController, public _services: GeneralService) { }

  public userData:any;
  public data_:any;
  //*****************************************************************//
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_ = JSON.parse(localStorage.getItem('renewal'));
    console.log(this.data_);
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
     this._services.service_general_put("HousingList/PutRenewalDetail", this.data_).subscribe((data => {
       if (data.success) {
         console.log(data);
         this.general_messages({
           title: "Success",
           body: "Renewal Details was updated",
           success: true
         });
         this.loader.loadingDismiss();
         this.modalController.dismiss();
       }
     }))
   }
}
