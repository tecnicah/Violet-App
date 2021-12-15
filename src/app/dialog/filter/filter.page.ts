import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  dates: any = {
    start: null,
    end: null,
  }

  public filter_data: any = {

  };

  constructor(public router: Router, public modalController: ModalController, public _services: GeneralService) { }

  ngOnInit() {
    console.log("filtros");
    this.getCatalogos();
  }

  public country_catalogue = [];
  public caServiceLine = [];
  public parther_catalogue = [];
  async getCatalogos() {
    this.parther_catalogue = await this._services.getCatalogueFrom('GetPartner');
    this.caServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
  }

  public city_catalogue = [];
  getcity() {
    if (!this.filter_data.country) {
      return true
    }
    this._services.service_general_get("Catalogue/GetState?country=" + this.filter_data.country).subscribe((data => {
      if (data.success) {
        this.city_catalogue = data.result;
      }
    }))
  }

  public coordinator_catalogue = [];
  getCoordinator() {
    if (!this.filter_data.serviceLine || !this.filter_data.client) {
      return true;
    }
    this._services.service_general_get("Catalogue/GetCoordinator/" + this.filter_data.client + "?servileLine=" + this.filter_data.serviceLine).subscribe((data => {
      if (data.success) {
        console.log("select coordinator: ", data.result);
        this.coordinator_catalogue = data.result.value;
      }
    }));
  }

  public client_catalogue = [];
  getClient() {
    console.log(this.filter_data);
    if (!this.filter_data.partner) {
      return true
    }
    this._services.service_general_get("Catalogue/GetClient/" + this.filter_data.partner).subscribe((data => {
      if (data.success) {
        console.log("select cliente: ", data.result.value);
        this.client_catalogue = data.result.value;
      }
    }));
  }

  public supplier_catalogue = [];
  getSupplierPartner() {
    console.log(this.filter_data);
    if (!this.filter_data.serviceLine || !this.filter_data.country || !this.filter_data.city) {
      return true;
    }
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country=" + this.filter_data.country + "&city=" + this.filter_data.city + "&serviceLine=" + this.filter_data.serviceLine).subscribe((data => {
      if (data.success) {
        console.log("select supplier: ", data.result.value);
        this.supplier_catalogue = data.result.value;
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
      if( this.dates.start != null ) this.filter_data.startDate = this.filterDate( this.dates.start );
      if( this.dates.end != null ) this.filter_data.endDate = this.filterDate( this.dates.end );
      for( let item in this.filter_data ) {
          if( this.filter_data[item] != '' ) {
              this.service_record_params_selected += `${ item }=${ this.filter_data[item] }&`;
              params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);
          }
      }
      this.parametros =  params ;
  }

  public filterDate( date_in:any ):string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }

  save() {
    this.modalController.dismiss(this.parametros);
  }
}
