import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.page.html',
  styleUrls: ['./view-appointment.page.scss'],
})
export class ViewAppointmentPage implements OnInit {

  constructor(public service: GeneralService,
    public router: Router, public ToastCtrl: ToastController,
    public modalController: ModalController,
    private iab: InAppBrowser,
    public loadingService: LoadingService) { }

  userData: any = {};
  info: any = {};
  data: any = {
    supplier: [{supplier:''}]
  };

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.info = JSON.parse(localStorage.getItem('apoiment'));
    console.log(this.info);
    this.getApoiment();
  }

  consultant = [];
  getApoiment(){
    this.loadingService.loadingPresent();;
    this.service.service_general_get('Appointment/GetAppointmentById?id='+this.info.id).subscribe(r =>{
      
      if(r.success){
        this.data = r.result.value[0];
        console.log(this.data);
        this.loadingService.loadingDismiss();;
      }
    })

 
    this.service.service_general_get('SupplierPartnerProfile/GetSupplierPartnersBySR/'+Number(localStorage.getItem('sr'))).subscribe(r =>{
      if(r.success){
        this.consultant = r.result.value;
        console.log(this.consultant);
        this.loadingService.loadingDismiss();;
      }
    })
  }

  viewDoc(doc){
    this.iab.create(this.service.url_images+doc,'_system')
  }

  back(){
    /*
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl(localStorage.getItem('back'));
    */
    window.history.back();
  }


  save(){
    console.log(this.data);
      var int = new Date(this.data.startTime);
      var end = new Date(this.data.endTime);
  
      this.data.startTime = int.getHours() + ':'+int.getMinutes();
      this.data.endTime = end.getHours() + ':'+end.getMinutes()
      console.log(this.data);
      this.data.updateBy  = this.userData.id;
      this.data.updatedDate = new Date();
      this.loadingService.loadingPresent();
      this.service.service_general_post_with_url('Appointment/UpdateAppointment', [this.data]).subscribe(r=>{
        if(r.success){
          console.log(r);
          this.loadingService.loadingDismiss();
          this.general_messages({
            title: "Success",
            body: "Updated Data",
            success: true
          });
        }
      })
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

 


  async deleteAppointment(data){

    debugger
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Start appoitment",
        body: "Are you sure you want start appoitment?",
        yesText: 'Yes, cancel',
        noText: 'No, cancel',
      }
    });
    modal.onDidDismiss().then((result) => {
      console.log(result);
      if (result) {
        this.service.service_general_delete("Appointment?key=" + data.id).subscribe((data => {
          if (data.success) {
            this.general_messages({
              title: "Success",
              body: "The appointment was canceled",
              success: true
            });
            this.router.navigateByUrl('assignee-taps/home');
          }
        }))
      }
    });
    this.modalController.dismiss();
    await modal.present();
  }

}
