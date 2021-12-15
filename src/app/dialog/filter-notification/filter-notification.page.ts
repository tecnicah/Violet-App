import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-filter-notification',
  templateUrl: './filter-notification.page.html',
  styleUrls: ['./filter-notification.page.scss'],
})
export class FilterNotificationPage implements OnInit {

  dates: any = {
    dateRange1: null,
    dateRange2: null,
  }

  filteruno: boolean = false;

  public filter_data: any = {

  };

  userData:any;

  constructor(public router: Router, public modalController: ModalController, public _services: GeneralService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log("filtros");
    this.getCatalogos();
  }

  public ca_notificationType = [];
  public ca_SR = [];
  async getCatalogos() {
    //this.ca_notificationType = await this._services.getCatalogueFrom('GetNotificationType');
    this._services.service_general_get('Catalogue/GetNotificationSystemType').subscribe((dataN => {
      if (dataN.success) {
        this.ca_notificationType = dataN.result;
        console.log('CATALOG NOTIFICATION TYPE: ', this.ca_notificationType);
      }
    }));


    this._services.service_general_get('Catalogue/GetServiceRecord/' + this.userData.id).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SR: ', data);
        this.ca_SR = data.result;
      }
    }));
  }


  

  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

  public service_record_params_selected:string = '';
  public parametros : any;
  public filteringServiceRecordTable():void {
      this.service_record_params_selected = '';
      let params:string = '';
      if( this.dates.dateRange1 != null ) this.filter_data.dateRange1 = this.filterDate( this.dates.dateRange1 );
      if( this.dates.dateRange2 != null ) this.filter_data.dateRange2 = this.filterDate( this.dates.dateRange2 );
      for( let item in this.filter_data ) {
          if( this.filter_data[item] != '' ) {
              this.service_record_params_selected += `${ item }=${ this.filter_data[item] }&`;
              params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);
          }
      }
      this.parametros =  params ;
  }

  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.filter_data) {
      if (this.filter_data[item] != '') {
        service_record_params_selected += `${ item }=${ this.filter_data[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params);
    this.parametros = params;
  }

  public filterDate( date_in:any ):string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }

  save() {
    this.modalController.dismiss(this.parametros);
  }
}
