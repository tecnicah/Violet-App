import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-supplier-partner-consultant',
  templateUrl: './supplier-partner-consultant.page.html',
  styleUrls: ['./supplier-partner-consultant.page.scss'],
})
export class SupplierPartnerConsultantPage implements OnInit {

  constructor(public loader: LoadingService,public iab: InAppBrowser ,public _services: GeneralService, public _routerParams: ActivatedRoute, public router: Router) { }

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
    this.ca_typeSupplier = await this._services.getCatalogueFrom('GetSupplierType');
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
    this._services.service_general_get('SupplierPartnerProfile/GetConsultant?key=' + id).subscribe((data => {
      if (data.success) {
        this.data = data.result;
        this.loader.loadingDismiss();
        if (this.data.areasCoverageConsultants.length > 0) {
          let city_additional;
          for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
            this.data.areasCoverageConsultants[i].additional = [];
            city_additional = this.data.areasCoverageConsultants[i].cityAreasCoverageConsultants;
            for (let j = 0; j < city_additional.length; j++) {
              this.data.areasCoverageConsultants[i].additional.push(city_additional[j].city);
            }
          }
        }

        for (let i = 0; i < this.data.areasCoverageConsultants.length; i++) {
          const element = this.data.areasCoverageConsultants[i].country;
          this.getCity(element, i);
        }

        console.log("esta es la consulta del servicio: ", this.data);
        this.ca_creditCard.forEach(E => {
          E.checked = false;
        });

        for (let i = 0; i < this.ca_creditCard.length; i++) {
          for (let j = 0; j < this.data.areasCoverageConsultants.length; j++) {
            let payment = this.data.areasCoverageConsultants[j].paymentInformationConsultants;
            for (let k = 0; k < payment.length; k++) {
              let credit_card = payment[k].creditCardPaymentInformationConsultants;
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
  openProfile(data){
    this.router.navigateByUrl('assignee-taps/home/profile-consultant/'+data.id);
  }
  //************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }

}
