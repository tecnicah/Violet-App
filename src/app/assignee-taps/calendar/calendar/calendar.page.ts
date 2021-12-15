import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoadingService } from 'src/app/general/loader.service';
import { EventoPage } from '../evento/evento.page';
import { EdicionEventoPage } from '../edicion-evento/edicion-evento.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { Router } from '@angular/router';
import { AvailabilityPage } from '../availability/availability.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(public router: Router,private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }

  public agregar_evento: boolean = false;
  public fecha = new Date();
  public eventos = [];
  public userData: any = {};

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get('MyDashboard/GetCalendar/' + this.userData.id).subscribe((data: any) => {
      if (data.success) {
        this.eventos = data.map.value.calendar;
        console.log(this.eventos);
      }
    });
  }
  //***************************************************************************//
  //FUNCION PARA EDITAR EVENTO//
  async agregar_appointment(){
    this.router.navigateByUrl('/assignee-taps/add-calendar');
    /*
    const modal = await this.modalController.create({
      component: EventoPage,
      componentProps: { id: 0 }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ngOnInit();
    })
    this.modalController.dismiss();
    await modal.present();
    */
  }
  //***************************************************************************//
  //FUNCION PARA EDITAR EVENTO//
  async editEvento(item, i){
    localStorage.setItem('edicionEvento', JSON.stringify(item));
    this.router.navigateByUrl('/assignee-taps/edit-calendar');
    /*
    const modal = await this.modalController.create({
      component: EdicionEventoPage,
      componentProps: item
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ngOnInit();
    })
    this.modalController.dismiss();
    await modal.present();
    */
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  back() {
    let back: any = document.getElementById('back');
    this.router.navigateByUrl('/assignee-taps/home');
    back.play();
    //this.modalController.dismiss();
  }
  //****************************************************************************//
  async delete(id, i){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Do you want delete this appointment?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        if (id != 0) {
          this._services.service_general_delete('Appointment?key=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "The appointment was deleted",
                success: true
              });
              this.ngOnInit();
            }
          })
        } 
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
   //************************************************************************************//
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
  //*****************************************************//
  async agregar_availability(){
    console.log("Agregar disponibilidad");
    const modal = await this.modalController.create({
      component: AvailabilityPage,
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ngOnInit();
    })
    this.modalController.dismiss();
    await modal.present();
  }
}
