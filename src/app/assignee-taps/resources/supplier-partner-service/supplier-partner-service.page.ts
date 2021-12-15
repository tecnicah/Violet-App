import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-supplier-partner-service',
  templateUrl: './supplier-partner-service.page.html',
  styleUrls: ['./supplier-partner-service.page.scss'],
})
export class SupplierPartnerServicePage implements OnInit {

  constructor(public loader: LoadingService,public iab: InAppBrowser, public _services: GeneralService, public _routerParams: ActivatedRoute) { }

  public data: any = {
    "id": 0,
    "photo": ''
  };

  ionViewWillEnter() {
    this.loader.loadingPresent();
    this.catalogos();
  }

  ngOnInit() {

  }

  public ca_supplierType = [];
  public ca_typeSupplier = [];
  public ca_creditCard = [];
  public ca_methodPayment = [];
  public ca_serviceLine = [];
  public ca_status = [];
  public ca_country = [];
  public ca_accountType = [];
  public ca_areacoverage = [];
  public ca_vehiculo = [];
  public ca_documentType = [];
  public ca_privacy = [];
  public ca_currency = [];
  public ca_contactType = [];
  public ca_language = [];
  public ca_taxes = [];
  public ca_term = [];
  //************************************************************//
  async catalogos() {
    this._services.service_general_get('Catalogue/GetSupplierType/1').subscribe((data => {
      if (data.success) {
        this.ca_supplierType = data.result;
      }
    }))
    this._services.service_general_get('Catalogue/GetSupplierType/2').subscribe((data => {
      if(data.success){
        this.ca_supplierType = data.result;
      }
    }))
    //this.ca_typeSupplier = await this._services.getCatalogueFrom('GetSupplierType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_methodPayment = await this._services.getCatalogueFrom('GetPaymentMethod');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_status = await this._services.getCatalogueFrom('GetSupplierPartnerProfileStatus');
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_areacoverage = await this._services.getCatalogueFrom('GetAreaCoverageType');
    this.ca_vehiculo = await this._services.getCatalogueFrom('GetVehicleType');
    this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/3');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_contactType = await this._services.getCatalogueFrom('GetContactType');
    this.ca_language = await this._services.getCatalogueFrom('GetLanguages');
    this.ca_taxes = await this._services.getCatalogueFrom('GetTaxePercentage');
    this.ca_term = await this._services.getCatalogueFrom('GetCreditTerm');

    let id_service = this._routerParams.snapshot.params.id;
    this.getDataSupplierPartner(id_service);

  }
  //************************************************************//
  getDataSupplierPartner(id) {
    this._services.service_general_get('SupplierPartnerProfile/GetService?key=' + id).subscribe((data => {
      if (data.success) {
        this.data = data.result;
        this.data.supplierPartnerDetails[0].vehiculo = [];
        if(this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.length > 0){
          for (let i = 0; i < this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails.length; i++) {
            this.data.supplierPartnerDetails[0].vehiculo.push(this.data.supplierPartnerDetails[0].typeVehiclesSupplierPartnerDetails[i].typeVehicles)
          }
        }

        if(this.data.areasCoverageServices.length > 0){
          let city_additional;
          for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
              this.data.areasCoverageServices[i].additional = [];
              city_additional = this.data.areasCoverageServices[i].cityAreasCoverageServices;
              for (let j = 0; j < city_additional.length; j++) {
                this.data.areasCoverageServices[i].additional.push(city_additional[j].city);
              }
          }
        }
        this.loader.loadingDismiss();
        for (let i = 0; i < this.data.areasCoverageServices.length; i++) {
          const element = this.data.areasCoverageServices[i].country;
          this.getCity(element,i);
        }

        console.log("esta es la consulta del servicio: ", this.data);
        this.ca_creditCard.forEach(E => {
          E.checked = false;
        });

        for (let i = 0; i < this.ca_creditCard.length; i++) {
          for (let j = 0; j < this.data.areasCoverageServices.length; j++) {
            let payment = this.data.areasCoverageServices[j].paymentInformationServices;
            for (let k = 0; k < payment.length; k++) {
              let credit_card = payment[k].creditCardPaymentInformationServices;
              for (let m = 0; m < credit_card.length; m++) {
                if (this.ca_creditCard[i].id == credit_card[m].creditCard) {
                  this.ca_creditCard[i].checked = true;
                }
              }
            }
          }
        }
        this.loader.loadingDismiss();
      }
    }))
  }
  //************************************************************//
  public ca_city: any[] = [];
  getCity(data, i) {
    console.log("consulta ciudad: ", data);
    this._services.service_general_get('Catalogue/GetState?country=' + data).subscribe((data => {
      if (data.success) {
        this.ca_city[i] = data.result;
      }
    }))
  }
  //************************************************************//
  getCityName(city, i) {
    if(this.ca_city.length > 0){
      for (let j = 0; j < this.ca_city[i].length; j++) {
        const element = this.ca_city[i][j];
        if (element.id == city) {
          return element.city;
        }
      }
    }
  }
  //************************************************************//
  nameAccount(id) {
    for (let i = 0; i < this.ca_accountType.length; i++) {
      if (this.ca_accountType[i].id == id) {
        return this.ca_accountType[i].accountType;
      }
    }
  }
  //************************************************************//
  nameDocument(id) {
    for (let i = 0; i < this.ca_documentType.length; i++) {
      if (this.ca_documentType[i].id == id) {
        return this.ca_documentType[i].documentType;
      }
    }
  }
  //************************************************************//
  back(){
    window.history.back();
  }
  //************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
