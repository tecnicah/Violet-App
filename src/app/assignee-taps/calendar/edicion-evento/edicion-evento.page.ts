import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edicion-evento',
  templateUrl: './edicion-evento.page.html',
  styleUrls: ['./edicion-evento.page.scss'],
})
export class EdicionEventoPage implements OnInit {

  constructor(public router: Router,private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  //public navParams: NavParams,
  public data: any;
  public appointment: any;
  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('edicionEvento'));
    console.log(this.data);
    if (this.data.id != 0) {
      this._services.service_general_get('Appointment/GetAppointmentById?id=' + Number(this.data.id)).subscribe((data => {
        console.log("appointment by id; ", data);
        this.appointment = data.result.value;
      }))
    }
  }

  save(){
    console.log("SAVE DATA: ", this.appointment);
    debugger
    this._services.service_general_post_with_url("Appointment/UpdateAppointment", this.appointment).subscribe((data => {
      if(data.success){
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Appointment was updated",
          success: true
        });
        localStorage.removeItem('edicionEvento');
        this.router.navigateByUrl('/assignee-taps/open-calendar');
        //this.modalController.dismiss();
      }
    }))
  }
   //***************************************************************************//
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
  //*****************************************************************************************************//
  //FUNCION PARA REGRESAR//
  back() {
    let back: any = document.getElementById('back');
    this.router.navigateByUrl('/assignee-taps/open-calendar');
    localStorage.removeItem('edicionEvento');
    back.play();
    //this.modalController.dismiss();
  }
}
