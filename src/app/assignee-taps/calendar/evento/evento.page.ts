import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  constructor(public router: Router,private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  //public navParams: NavParams,
  public data: any = {};
  public userData: any;
  public serviceRecord = [];
  public appointment = [];
  ngOnInit() {
    this.getCatalogos();
    let immigration_sr;
    let relocation_sr;
    let data_final_sr = [];
    //this.data = this.navParams.data;
    this.data = { id: 0 };
    console.log(this.data);
    this.data.sr = localStorage.getItem('srAd');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.data.id != 0) {
      this._services.service_general_get('Appointment/GetAppointmentById?id=' + Number(this.data.id)).subscribe((data => {
        console.log("appointment by id; ", data);
        this.appointment = data.result.value;
      }))
    } else{
      this.addAppointment();
    }
    this.getSR();
  }
  //***************************************************************************//
  //FUNCION PARA CATALOGOS//
  getCatalogos() {

  }
  //***************************************************************************//
  //FUNCION PARA SR//
  public sr = [];
  getSR(){
    this._services.service_general_get('ServiceRecord/GetServiceRecord/0/0/'+this.userData.id).subscribe(r=>{
      if(r.success){
          console.log(r.map.value);
          this.sr = r.map.value;
      }
    })
  }
  //***************************************************************************//
  //FUNCION PARA CONSULTA WORK ORDER//
  public workOrder = [];
  getWorkOrder() {
    let immigration;
    let relocation;
    let data_final = [];
    this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + Number(this.appointment[0].serviceRecordId) + '&service_line_id=' + 1).subscribe((dataIm => {
      if (dataIm.success) {
        console.log("DATA CATALOGO ADD POINTMENT im: ", dataIm);
        immigration = dataIm.result.value;
        this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + Number(this.appointment[0].serviceRecordId) + '&service_line_id=' + 2).subscribe((dataRe => {
          if (dataRe.success) {
            console.log("DATA CATALOGO ADD POINTMENT re: ", dataRe);
            relocation = dataRe.result.value;
            immigration.forEach(E => {
              data_final.push(E);
            });
            relocation.forEach(E => {
              data_final.push(E);
            });
            console.log('Data final: ', data_final);
            this.workOrder = data_final
          }
        }));
      }
    }));
  }
  //***************************************************************************//
  public data_check = [];
  getServices(i) {
    console.log("ENTRA A CONSULTAR");
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + Number(this.appointment[i].workOrder)).subscribe(r => {
      if (r.success) {
        this.data_check[i] = r.result.value;
        console.log(this.data_check);
      }
    })
  }
  //***************************************************************************//
  pushCheckbox(i, j, event, data_service) {
    if (event.detail.checked) {
      this.appointment[i].appointmentWorkOrderServices.push({
        "id": 0,
        "appointmentId": this.appointment[i].id,
        "workOrderServiceId": data_service.service
      })
    } else {
      this.appointment[i].appointmentWorkOrderServices.splice(j, 1);
    }
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR APPOINTMENT//
  addAppointment(){
    this.appointment.push({
        "id": 0,
        "serviceRecordId": Number(this.data.sr),
        "date": null,
        "startTime": null,
        "endTime": null,
        "description": null,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updateBy": this.userData.id,
        "updatedDate": null,
        "appointmentWorkOrderServices": [
          
        ],
        "documentAppointments": [
          
        ]
    });
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save(){
    console.log("SAVE DATA: ", this.appointment);
    debugger
    this._services.service_general_post_with_url("Appointment/CreateAppointment", this.appointment).subscribe((data => {
      if(data.success){
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Appointment was created",
          success: true
        });
        this.router.navigateByUrl('/assignee-taps/open-calendar');
        //this.modalController.dismiss();
      }
    }))
  }
  //***************************************************************************//
  //FUNCION PARA REGRESAR//
  back() {
    let back: any = document.getElementById('back');
    this.router.navigateByUrl('/assignee-taps/open-calendar');
    back.play();
    //this.modalController.dismiss();
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

}
