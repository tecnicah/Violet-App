import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ModalController } from '@ionic/angular';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { FilterNotificationPage } from 'src/app/dialog/filter-notification/filter-notification.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {


  userFilter: any = {
    type: '',
  }
  date_ = new Date();
  user: any;
  data_model: any = {};
  filteruno: boolean = false;

  constructor(public router: Router,
    public _services: GeneralService,
    public loadingService: LoadingService, public animationCtrl:AnimationController,
    public modalController: ModalController) { }

  ngOnInit() {
  }

  

  Scroll(event) {
    this._services.onScroll(event);
  }

  public show_name_assignee : boolean = false;
  ionViewWillEnter() {
    if(window.screen.width <= 500 ){
      this.show_name_assignee = true;
    }else{
     this.show_name_assignee = false;
    }
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.data_model.archive = false;
    this.get_catalogos();
    this.get_Notification();
  }
  //*************************************************************//
  ca_notificationType = [];
  ca_SR = [];
  async get_catalogos() {
    this.ca_notificationType = await this._services.getCatalogueFrom('GetNotificationType');
    this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SR: ', data);
        this.ca_SR = data.result;
      }
    }));
  }
  //*************************************************************//
  //CONSULTA DE INFORMACION DE LAS NOTIFICACIONES//
  ca_notification: any = [];
  get_Notification() {
    this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id).subscribe((data => { //this.area_orientation.workOrderServicesId
      if (data.success) {
        console.log('DATA CONSULTA NOTIFICACIONES: ', data);
        //this.ca_notification = data.result.value;
        this.ca_notification = data.result.value;
        console.log(this.ca_notification);
      }
    }));
  }
  //*************************************************************//
  //FILTRO DE BUSQUEDA MANUAL//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ca_notification.filter = filterValue.trim().toLowerCase();
  }
  //*************************************************************//
  //FILTRO FECHA//
  /*
  public filteringServiceRecordTable(): void {
    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.dateRange1 != null) this.data_model.dateRange1 = this.filterDate(this.range.value.dateRange1);
    if (this.range.value.dateRange2 != null) this.data_model.dateRange2 = this.filterDate(this.range.value.dateRange2);
    for (let item in this.data_model) {
      if (this.data_model[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_model[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if (this.range.value.dateRange1 != null && this.range.value.dateRange2 != null) {
      this.getServiceRecordTableData(params);
    }
  }*/
  //*************************************************************//
  public filterDate(date_in: any): string {
    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;
  }
  //*************************************************************//
  /* searchData() {
     let service_record_params_selected: string = '';;
     let params = '';
     for (let item in this.data_model) {
       if (this.data_model[item] != '') {
         service_record_params_selected += `${ item }=${ this.data_model[item] }&`;
         params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
       }
     }
     console.log("PARAMETROS DE BUSQUEDA: ", params)
     this.getServiceRecordTableData(params);
   }*/
  //*************************************************************//
  public getServiceRecordTableData(params: string = ''): void {
    this.loadingService.loadingPresent();
    const params_in: string = params == '' ? '' : `?${params}`;
    this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id + params_in).subscribe((data: any) => {
      if (data.success) {
        console.log("ESTAS SON LAS NOTIFICACIONES FILTRADAS:  ", data.result.value);
        this.ca_notification = data.result.value;
        this.loadingService.loadingDismiss();
      }
    });
  }
  //*************************************************************//
  //LIMPIEZA DE FILTROS//
  public cleanFilter(): void {
    this.data_model = {};
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ionViewWillEnter();
  }
  //*************************************************************//
  archive(item) {
    console.log(item);
      this.loadingService.loadingPresent();
      this._services.service_general_put('Notification/PutArchive/' + item.id + "/" + true, '').subscribe((data: any) => {
        if (data.success) {
          console.log("NOTIFICACION ARCHIVADA:  ", data);
          this.general_messages({
            title: "Success",
            body: "Notification Archived.",
            success: true
          });
          this.loadingService.loadingDismiss();
          this.cleanFilter()
          this.get_Notification();
        }
      });
      this.loadingService.loadingDismiss();
  }
  //*************************************************************//
  marcarLeida(data) {
    console.log(data);
    if (data.view == false) {
      this.loadingService.loadingPresent();
      this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + true, '').subscribe((data => {
        if (data.success) {
          this.ngOnInit();
          this.loadingService.loadingDismiss();
        }
      }));
    } else if (data.view == true) {
      this.loadingService.loadingPresent();
      this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + false, '').subscribe((data => {
        if (data.success) {
          this.ngOnInit();
          this.loadingService.loadingDismiss();
        }
      }));
    }
  }
  //***************************************************//
  //ACEPTAMOS NOTIFICACION//
  accept(data_, status) {
    console.log(status);
    this.loadingService.loadingPresent();
    this._services.service_general_putnoapi(status, '').subscribe((data => {
      this.loadingService.loadingDismiss();
      this.archive(data_,);
      this.marcarLeida(data_);
    }))
  }
  //DECLINAMOS NOTIFICACION//
  decline(data_, status) {
    console.log(status);
    this.loadingService.loadingPresent();
    this._services.service_general_putnoapi(status, '').subscribe((data => {
      console.log(data);
      this.loadingService.loadingDismiss();
      this.archive(data_,);
      this.marcarLeida(data_);
    }))
  }

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

  async openFilter() {
    const modal = await this.modalController.create({
      component: FilterNotificationPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      this.getServiceRecordTableData(data.data);
    })
    this.modalController.dismiss();
    await modal.present();
  }

  serviceRecord(data){
    this.router.navigateByUrl('assignee-taps/services-all/view-sr/'+data.serviceRecordId);
  }
}
