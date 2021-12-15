import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { ChangePasswordPage } from 'src/app/dialog/change-password/change-password.page';
import { GeneralService } from 'src/app/general/general.service';
import { NewAppointmentPage } from './new-appointment/new-appointment.page';
import { ConfirmationPage } from './../../dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { CalendarPage } from '../calendar/calendar/calendar.page';
import { ToastController } from '@ionic/angular';
import { getMonth } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public ToastCtrl: ToastController,private routerOutlet: IonRouterOutlet ,private permissionsService: NgxPermissionsService, public service: GeneralService,
    public router: Router,
    public modalController: ModalController,
    public loadingService: LoadingService,
    public platform: Platform) { }
  userData: any = {};
  apointments: any[] = [];
  apointmentsres: any[] = [];
  sr: any;
  filteruno: boolean = false;
  userFilter: any = { location: '' };
  dates: any = {
    dateIn: null,
    dateOut: null,
  }
  __title__: string = "Premier Destination Services";
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  show_header:boolean = false;
  

  ngOnInit() {

    if (this.platform.is('android')) {
      this.show_header = false;
    } else if (this.platform.is('ios')) {
      this.show_header = true;
    }

    console.log(JSON.parse(localStorage.getItem('data_notification')))
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData);
    if (this.userData.role.id == 4) {
      this.__title__ = this.userData.clientName;
    }

    //this.permissionsService.loadPermissions([this.userData.role.id]);
    console.log(this.userData);
    //this.ionViewWillEnter();
  }
  cargarImagenPorDefecto(e) {
    console.log('entra');
    e.target.src = 'https://www.blackwallst.directory/images/NoImageAvailable.png';
  }

  show_name_assignee: boolean = false;
  ionViewWillEnter() {
    this.routerOutlet.swipeGesture = false;
    console.log(JSON.parse(localStorage.getItem('data_notification')))
    console.log(window.screen.width);
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }

    const user_rol: string[] = [this.__userlog__.role.id];
    this.permissionsService.loadPermissions(user_rol);

    setTimeout(() => {
      let img = document.getElementsByTagName('img');
      console.log(img);
      for (let i = 0; i < img.length; i++) {
        const element = img[i];
        element.onerror = this.cargarImagenPorDefecto;
      }


    }, 5000);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    /*
    if (this.userData.reset == true) {
      this.password();
    }
    */
    if (this.userData.role.id == 4) {
      //this.updateData();
    }
    console.log(this.userData);
    this.sr = Number(localStorage.getItem('sr'));
    console.log(this.sr);
    debugger
    if (this.sr != 0 && this.userData.role.id == 4) {
      this.loadingService.loadingPresent();
      this.service.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.sr).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.apointments = r.result.value;
          this.apointmentsres = r.result.value;
          console.log(this.apointments, this.apointmentsres);
          this.loadingService.loadingDismiss();
        }
      })
      this.service.service_general_get(`ServiceRecord/GetServiceRecordById?id=${this.sr}&user=${this.userData.id}`)
        .subscribe((response: any) => {
          console.log(response);
          if (response.success) {
            let data = response.result;
            localStorage.setItem('partnerID', data.partnerId)
            localStorage.setItem('immigrationCoodinators', JSON.stringify(data.immigrationCoodinators));
            localStorage.setItem('immigrationSupplierPartners', JSON.stringify(data.immigrationSupplierPartners));
            localStorage.setItem('relocationCoordinators', JSON.stringify(data.relocationCoordinators));
            localStorage.setItem('relocationSupplierPartners', JSON.stringify(data.relocationSupplierPartners));
            localStorage.setItem('cliente', data.partnerId);
          }
        })
    } else {
      this.loadingService.loadingPresent();
      this.service.service_general_get('Appointment/GetAppointmentByUser?UserId=' + this.userData.id).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.apointments = r.result.value;
          this.apointmentsres = r.result.value;
          console.log(this.apointments, this.apointmentsres);
          this.loadingService.loadingDismiss();
        }
      })
    }

    if (this.userData.reset == true) {
      this.password();
    }
    this.loadingService.loadingDismiss();
  }

  async password() {
    console.log("ES NECESARIO CAMBIAR PASSWORD");
    const modal = await this.modalController.create({
      component: ChangePasswordPage,
      backdropDismiss: true
    })

    modal.onDidDismiss().then((data) => {
      console.log(data);
      //this.router.navigateByUrl('assignee-taps/help-settings/settings');
    })

    await modal.present();
  }

  documents() {
    localStorage.setItem('back', "assignee-taps/home");
    this.router.navigateByUrl('assignee-taps/documents');
  }

  resources() {
    localStorage.setItem('back', "assignee-taps/home");
    this.router.navigateByUrl('assignee-taps/resources');
  }

  profile() {
    console.log("Entra a profile");
    if (this.userData.role.id === 4) {
      this.router.navigateByUrl('assignee-taps/profile');
    } else if (this.userData.role.id === 1) {
      this.router.navigateByUrl('assignee-taps/home/profile-manager/'+this.userData.profileUsers[0].id);
    } else if (this.userData.role.id === 2) {
      this.router.navigateByUrl('assignee-taps/home/profile-manager/'+this.userData.profileUsers[0].id);
    } else {
      this.router.navigateByUrl('assignee-taps/home/profile-manager/'+this.userData.profileUsers[0].id);
      //this.router.navigateByUrl('assignee-taps/home/profile-consultant');
    }
  }

  services() {
    localStorage.setItem('back', "assignee-taps/home");
    if (this.userData.role.id === 4) {
      this.router.navigateByUrl('assignee-taps/services');
    } else {
      this.router.navigateByUrl('assignee-taps/services-all');
    }
  }

  viewApoitment(i, data) {
    localStorage.setItem('back', "assignee-taps/home");
    data.noApo = i;
    localStorage.setItem('apoiment', JSON.stringify(data));
    this.router.navigateByUrl('assignee-taps/view-appointment');
  }

  viewallApoitment() {
    localStorage.setItem('back', "assignee-taps/home");
    this.router.navigateByUrl('assignee-taps/view-all-appointment');
  }
  // modal de apoitment
  async startAppoitment(i, appoi) {
    // console.log('modal', i);
    console.log('modal', appoi);

    let split_fecha = appoi.date.split("T");
    let fecha = split_fecha[0];
    let split_mes_dia = fecha.split("-");
    let fecha_actual_dia = new Date().getDate();
    let fecha_actual_mes = new Date().getMonth()+1;
    let fecha_actual_year = new Date().getFullYear();
    let date_appointment = new Date(split_mes_dia[0], split_mes_dia[1]-1, split_mes_dia[2]);
    
    if(Number(date_appointment.getFullYear()) == fecha_actual_year){
      if(Number(date_appointment.getMonth()+1) == fecha_actual_mes){
        if(Number(date_appointment.getDate()) == fecha_actual_dia){
           console.log("Se inicia el appointment");
           this.iniciarAppointment(i, appoi);
        }
        else{
          console.log("No se inicia el appointment")
          this.messageAppointment();
        }
      }else{
        console.log("No se inicia el appointment");
        this.messageAppointment();
      }
    }else{
      console.log("No se inicia el appointment");
      this.messageAppointment();
    }
  }

  async messageAppointment(){
    const toast = await this.ToastCtrl.create({
      header: 'Start Appointment',
      message: 'Unable to start appointment',
      position: 'top',
      cssClass: 'toast_',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

  }


  async iniciarAppointment(i, appoi){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Start appoitment",
        body: "Are you sure you want start appoitment?",
        yesText: 'Yes, start',
        noText: 'No, continue',
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data) {
        this.service.service_general_post_with_url('Appointment/App/Start/' + appoi.id + '/' + this.userData.id, '').subscribe(r => {
          if (r.success) {
            console.log(r);
            this.general_messages({
              title: "Success",
              body: "Inserted Data",
              success: true
            });
            this.ionViewWillEnter();
          }
        })
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

  async endAppoitment(i, endAppoi) {
    // /api/Appointment/App/End/{report}/{appointment}/{user}
    console.log('modal', endAppoi);
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "End appoitment",
        body: "Are you sure you want end appoitment?",
        yesText: 'Yes, end',
        noText: 'No, continue',
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data) {
        this.service.service_general_put('Appointment/App/End/' + endAppoi.report + '/' + endAppoi.id + '/' + this.userData.id, '').subscribe(r => {
          if (r.success) {
            console.log(r);
            this.general_messages({
              title: "Success",
              body: "Inserted Data",
              success: true
            });
            this.ionViewWillEnter();
          }
        })
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();

  }
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
  public cleanFilter(): void {

    this.filteruno = true;
    this.userFilter = {
      location: ''
    }

    this.dates = {
      dateIn: null,
      dateOut: null,
    }
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ionViewWillEnter();

  }

  filterDate() {
    console.log(this.dates);
    if (this.dates.dateOut != null) {
      let inicio = this.dates.dateIn;
      let fin = this.dates.dateOut;

      var fechas = [];

      while (fin.getTime() >= inicio.getTime()) {
        let i = inicio;
        console.log(inicio.getFullYear() + '/' + (inicio.getMonth() + 1) + '/' + inicio.getDate());
        fechas.push(inicio.getFullYear() + '/' + (inicio.getMonth() + 1) + '/' + inicio.getDate());
        inicio.setDate(inicio.getDate() + 1);
      }
      console.log(fechas);
      let apo = [];
      for (let i = 0; i < fechas.length; i++) {
        const e = fechas[i];
        for (let j = 0; j < this.apointmentsres.length; j++) {
          const element = this.apointmentsres[j];
          console.log(new Date(element.date));
          console.log(e);
          if (e == (new Date(element.date).getFullYear() + '/' + (new Date(element.date).getMonth() + 1) + '/' + new Date(element.date).getDate())) {
            apo.push(element);
          }
        }
      }
      console.log(apo);
      this.apointments = apo;
    }
  }

  async addAppointment() {
    this.router.navigateByUrl('/assignee-taps/add-appointment');
    /*
    const modal = await this.modalController.create({
      component: NewAppointmentPage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
    */
  }

  async openCalendar() {
    this.router.navigateByUrl('/assignee-taps/open-calendar');
    /*
    const modal = await this.modalController.create({
      component: CalendarPage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
    */
  }


  Scroll(event) {
    this.service.onScroll(event);
  }

  updateData(){
    console.log("entra a update data");
    let data = JSON.parse(localStorage.getItem('credenciales'));
    this.loadingService.loadingPresent();;
    this.service.service_general_post_with_url('User/Login?' + 'email=' + data.email + '&password=' + data.password, data)
    .subscribe((response: any) => {
      if (response.success) {
        console.log(response);
        let play: any = document.getElementById('success');
        if (response.result.assigneeInformations.length > 0) {
          localStorage.setItem('userData', JSON.stringify(response.result));
          play.play();
          this.loadingService.loadingDismiss();;
        }
      }
      console.log('Response ===> ', response);
    }, (error: any) => {
      console.error('Error login WS ===> ', error);

    });
  }
}

