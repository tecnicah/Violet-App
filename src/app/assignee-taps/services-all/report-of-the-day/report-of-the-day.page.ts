import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { PopoverController } from '@ionic/angular';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-report-of-the-day',
  templateUrl: './report-of-the-day.page.html',
  styleUrls: ['./report-of-the-day.page.scss'],
})
export class ReportOfTheDayPage implements OnInit {

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
  serviceAdd: any = {};

  addService: boolean = false;

  report: any = {};

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.navParams.data.data);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.calatolos();
    if(this.navParams.data.data.id == 0){
      this.report.reportNo = this.navParams.data.data.i;
      this.report.reportBy = this.userData.id;
      this.report.id = 0;
      this.report.serviceReportDays = [];
      this.report.totalTime = 0;
    }else{
      this.loadingService.loadingPresent();
      this.service.service_general_get('ReportDay/GetreportDayById?id='+this.navParams.data.data.id).subscribe(r=>{
        if(r.success){
          this.report = r.result;
          this.getWO();
          this.getServices();
          this.loadingService.loadingDismiss();
          console.log('Aqui ===========>', r.result);
          /*for (let i = 0; i < this.allUser.length; i++) {
            const element = this.allUser[i];
            if(element.id == this.data.reportBy){
              this.userReport = element;
            }
          }*/
        }})
    }
    this.report.creationDate = new Date();
    
  }

  async calatolos() {
    this.caSl = await this.service.getCatalogueFrom('GetServiceLine');
  }

  getWO() {
    this.service.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.navParams.data.data.sr + '&service_line_id=' + this.report.serviceLine).subscribe(r => {
      if (r.success) {
        this.caWo = r.result.value;
      }
    })
  }

  getServices() {
    this.service.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.report.workOrder).subscribe(r => {
      if (r.success) {
        this.caService = r.result.value;
      }
    })
  }

  public show:boolean = false;
  public get_total_hours: number = 0;
  getHoras() {
    console.log(this.report.startTime, this.report.endTime);
    const create_date_one: Date = new Date(this.report.startTime),
      create_date_two: Date = new Date(this.report.endTime);
    if (this.report.startTime != undefined && this.report.endTime != undefined) {

      let get_difference: any = (create_date_two.getTime() - create_date_one.getTime()) / 1000;

      get_difference /= (60 * 60);

      this.get_total_hours = Math.abs(Math.round(get_difference));
      if(this.get_total_hours > 8){
        this.report.endTime = '';
        this.report.startTime = '';
        this.show = true;
      }else{
        this.report.totalTime = this.get_total_hours;
      }
    }
  }

  addServicenew() {
    this.serviceAdd.id = 0;
    this.serviceAdd.reportDayId = this.report.id;
    this.serviceAdd.createdBy = this.userData.id;
    this.serviceAdd.createdDate = new Date();
    this.serviceAdd.updateBy = this.userData.id;
    this.serviceAdd.updatedDate = new Date();
    this.report.serviceReportDays.push(this.serviceAdd);
    this.serviceAdd = {};
    this.addService = false;
  }

  deleteService(i) {
    this.report.serviceReportDays.splice(i, 1);
  }

  save() {
    this.loadingService.loadingPresent();
    if (this.report.id == 0) {
      this.service.service_general_post_with_url("ReportDay/PostReportDay", this.report).subscribe((data => {
        if (data.success) {
          console.log(data);
          this.general_messages({
            title: "Success",
            body: "Save Data",
            success: true
          });
          this.back();

        }
      }))
    } else {
      this.service.service_general_put("ReportDay/PutReportDay", this.report).subscribe((data => {
        if(data.success){
          console.log(data);
          this.general_messages({
            title: "Success",
            body: "Update Data",
            success: true
          });
          this.back();
        }
      }))
    }
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
