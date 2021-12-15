import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-request-additional-time',
  templateUrl: './request-additional-time.page.html',
  styleUrls: ['./request-additional-time.page.scss'],
})
export class RequestAdditionalTimePage implements OnInit {

  constructor(
    public service: GeneralService,
    public modalController: ModalController,
    public navParams: NavParams,
    public popoverController: PopoverController,
    public loadingService: LoadingService
  ) { }

  userData: any = {};
  caSl: any[] = [];
  caWo: any[] = [];
  caService: any[] = [];

  data: any = {};

  ngOnInit() {
    console.log(this.navParams);
  }

  ionViewWillEnter() {
    console.log(this.navParams.data.data);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data = {
        id : 0,
        workOrder : 0,
        service : 0,
        requestTime : 0,
        comments : null,
        createdBy : this.userData.id,
        createdDate : new Date(),
        updateBy : this.userData.id,
        updatedDate : new Date(),
    }
    this.catalogos();
  }

  catalogos(){
    this.service.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.navParams.data.data.sr + '&service_line_id=' + this.navParams.data.data.sl).subscribe(r => {
      if (r.success) {
        this.caWo = r.result.value;
      }
    })
  }

  
  getServices() {
    this.service.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data.workOrder).subscribe(r => {
      if (r.success) {
        this.caService = r.result.value;
      }
    })
  }

  save(){
    this.loadingService.loadingPresent();
    this.service.service_general_post_with_url('RequestAdditionalTime/PostRequestAdditionalTime', [this.data]).subscribe(r=>{
      if(r.success){
        console.log(r);
          this.general_messages({
            title: "Success",
            body: "Save Data",
            success: true
          });
          this.loadingService.loadingPresent();
          this.back();
      }else{
        this.general_messages({
          title: "Error",
          body: r.message,
          success: false
        });
      }
    })
  }

  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
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
}
