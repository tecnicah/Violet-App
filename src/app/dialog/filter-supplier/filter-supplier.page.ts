import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-filter-supplier',
  templateUrl: './filter-supplier.page.html',
  styleUrls: ['./filter-supplier.page.scss'],
})
export class FilterSupplierPage implements OnInit {

  search: any = {
    status: '',
    supplierCategory: '',
    partnerType: '',
    country: '',
    city:''
  };

  data_user:any;
  disabled:boolean = false;
  constructor(public router: Router, public modalController: ModalController, public _services: GeneralService) { }

  ngOnInit() {
    console.log("filtros");
    this.data_user = JSON.parse(localStorage.getItem('userData'));
    if(this.data_user.role.id == 3){ 
      this.search.country = this.data_user.profileUsers[0].country;
      this.getCity();
      this.search.city = this.data_user.profileUsers[0].city;
      this.filteringServiceRecordTable();
      this.disabled = true;
    }
    console.log("userData: ", this.data_user);
    this.getCatalogos();
  }

  public country_catalogue = [];
  public caServiceLine = [];
  public parther_catalogue = [];
  public ca_supplierType = [];
  async getCatalogos() {
    this.parther_catalogue = await this._services.getCatalogueFrom('GetPartner');
    this.caServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this._services.service_general_get('Catalogue/GetSupplierTypeCatalogue?id=1&id=2&id=3&id=4&id=5&id=6&id=7&id=8&id=9&id=10&id=11&id=12&id=13&id=14&id=15&id=16&id=17&id=18&id=19&id=20&id=21&id=22&id=23&id=24&id=25&id=26&id=27&id=28&id=29&id=30').subscribe((data => {
      if (data.success) {
        this.ca_supplierType = data.result;
      }
    }))

  }

  public ca_city = [];
  getCity() {
    let data = this.search.country;
    console.log("consulta ciudad: ", data);
    this._services.service_general_get('Catalogue/GetState?country=' + data).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
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
      for( let item in this.search ) {
          if( this.search[item] != '' ) {
              this.service_record_params_selected += `${ item }=${ this.search[item] }&`;
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
