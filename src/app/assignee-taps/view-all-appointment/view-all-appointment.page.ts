import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';
@Component({
  selector: 'app-view-all-appointment',
  templateUrl: './view-all-appointment.page.html',
  styleUrls: ['./view-all-appointment.page.scss'],
})
export class ViewAllAppointmentPage implements OnInit {

  constructor(public service: GeneralService,
    public router: Router,
    public modalController: ModalController,
    private iab: InAppBrowser,
    public loadingService: LoadingService) { }

    userData:any = {};
    sr:number = 0;
    apointments: any[]=[];
    apointmentsres: any[]=[];
    userFilter: any = {coordinador: ''};
    dates: any = {
      dateIn: null,
      dateOut: null,
    }
    filteruno:boolean = false;
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  Scroll(event) {
    this.service.onScroll(event);
  }

  show_name_assignee : boolean = false;
  ionViewWillEnter(){
    console.log(window.screen.width);
    if(window.screen.width <= 500 ){
       this.show_name_assignee = true;
    }else{
      this.show_name_assignee = false;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getApoiment();
  }

  getApoiment(){
    this.loadingService.loadingPresent();
    this.sr = Number(localStorage.getItem('sr'));
    console.log(this.sr);
    if(this.sr != 0 && this.userData.role.id == 4){
    this.loadingService.loadingPresent();
    this.service.service_general_get('Appointment/GetAppointmentByServiceRecordId?id='+this.sr).subscribe(r => {
      console.log(r);
      if(r.success){
        this.apointments = r.result.value;
        this.apointmentsres = r.result.value;
        console.log(this.apointments, this.apointmentsres);
        this.loadingService.loadingDismiss();
      }
    })
  }else{
    this.loadingService.loadingPresent();
    this.service.service_general_get('Appointment/GetAppointmentByUser?UserId='+this.userData.id).subscribe(r => {
      console.log(r);
      if(r.success){
        this.apointments = r.result.value;
        this.apointmentsres = r.result.value;
        console.log(this.apointments, this.apointmentsres);
        this.loadingService.loadingDismiss();
      }
    })
  }
  this.loadingService.loadingDismiss();
  }
  async startAppoitment(i, appoi){
    // console.log('modal', i);
    console.log('modal', appoi );

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
        this.service.service_general_post_with_url('Appointment/App/Start/' + appoi.id +'/'+ this.userData.id, '').subscribe(r => {
          if(r.success){
            console.log(r);
            this.general_messages({
              title: "Success",
              body: "Inserted Data",
              success: true
            });
            this.getApoiment();
          }
        })
      }
    })
    this.modalController.dismiss();
    // console.log(data);
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
        this.service.service_general_put('Appointment/App/End/' + endAppoi.report +'/' + endAppoi.id +'/'+ this.userData.id, '').subscribe(r => {
          if(r.success){
            console.log(r);
            this.general_messages({
              title: "Success",
              body: "Inserted Data",
              success: true
            });
            this.getApoiment();
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

  viewDoc(doc){
    this.iab.create(this.service.url_images+doc,'_system')
  }

  back(){
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl('assignee-taps/home');
  }

  viewApoitment(i,data){
    localStorage.setItem('back',"assignee-taps/view-all-appointment");
    data.noApo = i;
    localStorage.setItem('apoiment',JSON.stringify(data));
    this.router.navigateByUrl('assignee-taps/view-appointment');
  }

  public cleanFilter():void {

    this.filteruno = true;
    this.userFilter = {
      location: ''
    }

    this.dates = {
      dateIn: null,
      dateOut: null,
      status:null
    }
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.getApoiment();

}

filterDate(){
  console.log(this.dates);
  if(this.dates.dateOut != null){
    let inicio = this.dates.dateIn;
    let fin = this.dates.dateOut;

    var fechas = [];

    while(fin.getTime() >= inicio.getTime()){
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
          if(e == (new Date(element.date).getFullYear() + '/' + (new Date(element.date).getMonth() + 1) + '/' + new Date(element.date).getDate())){
            apo.push(element);
          }
        }  
    }
    console.log(apo);
    this.apointments = apo;
  }
}

  change(){
    console.log(this.dates);
    let filter = [];
  }
}
