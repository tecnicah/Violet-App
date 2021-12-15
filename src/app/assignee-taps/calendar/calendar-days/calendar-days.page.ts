import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-calendar-days',
  templateUrl: './calendar-days.page.html',
  styleUrls: ['./calendar-days.page.scss'],
})
export class CalendarDaysPage implements OnInit {

  user: any;
  ca_day: any[] = [];
  ca_hours: any[] = [
    { hora: '9:00' },
    { hora: '10:00' },
    { hora: '11:00' },
    { hora: '12:00' },
    { hora: '13:00' },
    { hora: '14:00' },
    { hora: '15:00' },
    { hora: '16:00' },
    { hora: '17:00' },
    { hora: '18:00' },
    { hora: '19:00' },
    { hora: '20:00' }
  ];

  public data: any;

  constructor(public navParams: NavParams,public _services: GeneralService, public modalCtrl: ModalController) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userData'));
    this.data = this.navParams.data;
    console.log('data recibida: ', this.data);
    this.catalogos();
  }

  async catalogos() {
    this.ca_day = await this._services.getCatalogueFrom('GetDay');
  }

  public new_hour: any = [];
  addHour() {
    this.new_hour.push({
      "hourStart": '',
      "hourEnd": '',
      "available": ''
    })
  }

  save() {
    let data_to_send = {
      "id": this.data.id,
      "day": this.data.day,
      "consultantContactsConsultant": this.user.id,
      "hourStart": this.data.hourStart,
      "hourEnd": this.data.hourEnd,
      "available": this.data.available,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "date": this.data.date_selected
    }
    console.log("save data: ", data_to_send);
    data_to_send.date = this.data.date;
    this._services.service_general_post_with_url("Calendar/UpdateAvailability", data_to_send).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "The event was updated",
          success: true
        });
        this.modalCtrl.dismiss();
      }
    }))
  }


  postNewAvailability() {
    for (let i = 0; i < this.new_hour.length; i++) {
      if (this.new_hour[i].hourStart != '' && this.new_hour[i].hourStart != null && this.new_hour[i].hourStart != undefined &&
        this.new_hour[i].hourEnd != '' && this.new_hour[i].hourEnd != null && this.new_hour[i].hourEnd != undefined) {

        let data_to_send = {
          "id": this.data.id,
          "day": this.data.day,
          "consultantContactsConsultant": this.user.id,
          "hourStart": this.new_hour[i].hourStart,
          "hourEnd": this.new_hour[i].hourEnd,
          "available": this.new_hour[i].available,
          "createdBy": this.user.id,
          "createdDate": new Date(),
          "updatedBy": this.user.id,
          "updatedDate": new Date(),
          "date": this.data.date_selected
        }
        this._services.service_general_post_with_url("Calendar/AddAvailability", data_to_send).subscribe((data => {
          if (data.success) {
            console.log(data);
          }
        }))
      }
    }
    this.general_messages({
      title: "Success",
      body: "The event was saved",
      success: true
    });
    this.modalCtrl.dismiss();
  }


  async general_messages(data) {
    const modal = await this.modalCtrl.create({
      component: GeneralMensagePage,
      cssClass: 'modal-general-mensage',
      backdropDismiss: true,
      componentProps: data
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    })
    this.modalCtrl.dismiss();

    await modal.present();
  }

  back(){
    this.modalCtrl.dismiss();
  }
}
